'use client';
import { useEffect, useRef /*useState*/ } from 'react';
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
    // const [countryName, setCountryName] = useState<string>('');

    useEffect(() => {
        const width = 1000;
        const height = 600;

        const svg = d3
            .select(svgRef.current)
            .attr('viewBox', `0 0 1000 600`) // Define the viewBox for scaling
            .attr('preserveAspectRatio', 'xMidYMid meet');

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
                                ? '#3CB371'
                                : '#ffffff'
                        )
                        .style('stroke', '#000000')
                        .on(
                            'mouseover',
                            (event: MouseEvent, d: CountryFeature) => {
                                const target =
                                    event.currentTarget as SVGPathElement;

                                if (Countries.includes(d.properties.NAME_EN)) {
                                    d3.select(target)
                                        .style('cursor', 'pointer')
                                        .style('fill', '#228B22');
                                } else {
                                    d3.select(target)
                                        .style('cursor', 'default')
                                        .style('fill', '#ffffff');
                                }
                            }
                        )
                        .on(
                            'mouseout',
                            (event: MouseEvent, d: CountryFeature) => {
                                const target =
                                    event.currentTarget as SVGPathElement; // Assert the type here
                                d3.select(target).style('fill', () =>
                                    Countries.includes(d.properties.NAME_EN)
                                        ? '#3CB371'
                                        : '#ffffff'
                                ); // Restore original color on mouse out
                            }
                        );
                    // .on('click', (event: MouseEvent, d: CountryFeature) => {
                    // setCountryName(d.properties.NAME_EN);
                    // });
                }
            )
            .catch((error) => console.error('Error loading GeoJSON:', error));
    }, []);
    return (
        <>
            <div className='flex justify-center items-center w-full h-[500px] md:h-[700px] lg:h-[900px]'>
                <svg ref={svgRef} className='w-full h-full'></svg>
            </div>
        </>
    );
};

export default WorldMap;
