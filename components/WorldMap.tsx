'use client';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Feature, FeatureCollection } from 'geojson';

import Countries from '../public/CountriesVisited';

interface CountryProperties {
    NAME_EN: string;
    ISO_A3: string;
}

type CountryFeature = Feature<GeoJSON.Geometry, CountryProperties>;

const WorldMap: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [countryName, setCountryName] = useState<string>('');

    useEffect(() => {
        const width = 1000;
        const height = 600;

        const svg = d3
            .select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const projection = d3
            .geoMercator()
            .scale(125)
            .translate([width / 2, height / 1.75]);

        const path = d3.geoPath().projection(projection);

        fetch(
            'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson'
        )
            .then((response) => response.json())
            .then(
                (
                    worldData: FeatureCollection<
                        GeoJSON.Geometry,
                        CountryProperties
                    >
                ) => {
                    svg.selectAll('.country')
                        .data(worldData.features)
                        .enter()
                        .append('path')
                        .attr('class', 'country')
                        .attr('d', path)
                        .style('fill', (d: CountryFeature) =>
                            Countries.includes(d.properties.NAME_EN)
                                ? '#ff9999'
                                : '#ffffff'
                        )
                        .style('stroke', '#000000')
                        .style('cursor', 'pointer')
                        .on('click', (event: MouseEvent, d: CountryFeature) => {
                            setCountryName(d.properties.NAME_EN);
                        });
                }
            )
            .catch((error) => console.error('Error loading GeoJSON:', error));
    }, []);
    return (
        <>
            <svg ref={svgRef}></svg>
        </>
    );
};

export default WorldMap;
