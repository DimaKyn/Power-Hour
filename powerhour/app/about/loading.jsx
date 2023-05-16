import Image from "next/image";

export default function Loading() {
    return <div>
        <h1>Loading...</h1>
        <Image src="/public/pwrhwrlogo.png" width="100" height="100" />
    </div>
}