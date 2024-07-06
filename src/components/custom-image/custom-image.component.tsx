import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height: string | number;
  mt?: number;
  mb?: number;
}

export default function CustomImage({
  src,
  alt,
  width = "100%",
  height,
  mt,
  mb
}: CustomImageProps) {
  return (
    <div
      style={{
        marginTop: mt,
        marginBottom: mb,
        width: width,
        height: height,
        position: "relative",
      }}
    >
      <Image src={src} alt={alt} fill />
    </div>
  );
}
