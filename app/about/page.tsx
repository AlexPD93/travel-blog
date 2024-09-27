import { Card, CardContent } from '@/components/ui/card';

export default function About() {
    return (
        <>
            <h1 className='text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl'>
                About me
            </h1>
            <div className='flex flex-col items-center gap-6'>
                <Card className='w-full max-w-md p-4'>
                    <CardContent>
                        <p>
                            Hey, I’m Alex! I’ve spent years exploring nearly
                            every corner of the globe. From the bustling streets
                            of Asia to the historic sites of Europe, the natural
                            wonders of South America to the vibrant cultures of
                            Africa and Australia. The only continent I haven’t
                            set foot on is Antarctica!
                        </p>
                    </CardContent>
                </Card>
                <Card className='w-full max-w-md p-4'>
                    <CardContent>
                        <p>
                            With a background in hospitality, I’ve developed a
                            real passion for great food. Trying local dishes,
                            whether from a street vendor or a hidden gem
                            recommended by locals, is one of my favorite parts
                            of traveling. To me, food is a key part of
                            understanding and experiencing a new place.
                        </p>
                    </CardContent>
                </Card>
                <Card className='w-full max-w-md p-4'>
                    <CardContent>
                        <p>
                            I started this blog to share what I’ve learned about
                            traveling on a budget. I love finding authentic
                            experiences, and enjoying the best local eats.
                            Whether you’re a travel newbie or a seasoned
                            explorer, I hope you’ll find useful tips and
                            inspiration here. Let’s dive into the world
                            together—one delicious bite at a time!
                        </p>
                    </CardContent>
                </Card>
            </div>
            s
        </>
    );
}
