import { Image } from "@imagekit/next";


export default function MyUploads(){
    return (
        <>
            <div>
                <Image
                    urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT!}
                    alt="Loading..."
                    src="https://ik.imagekit.io/t012cpxdb/44582_H-WLgo92QE.png"
                    loading="lazy"
                    width={1000}
                    height={1000}
                >

                </Image>
            </div>
        </>
    )
}