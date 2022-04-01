import Image from "next/image";
import { BaseSyntheticEvent, useEffect, useState } from "react";

type ImageUploadProps = {
    width?: string | number | undefined,
    height?: string | number | undefined,
    layout?: "fixed" | "fill" | "intrinsic" | "responsive" | undefined,
    className?: string | undefined,
    alt?: string | undefined,
}

export const ImageUpload = (props: ImageUploadProps) => {
    const [selectedImage, setSelectedImage] = useState();
    const [imagePreview, setImagePreview] = useState("");

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedImage) {
            setImagePreview("")
            return;
        }

        const objectUrl = URL.createObjectURL(selectedImage);
        setImagePreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedImage]);

    const onSelectImage = (e: BaseSyntheticEvent) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedImage(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedImage(e.target.files[0])
    }

    return (
        <>
            <label className="label">
                <span className="label-text">Imagem</span>
            </label>
            <label className="block">
                <span className="sr-only">Selecione uma imagem</span>
                <input type="file" onChange={onSelectImage}
                    className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100" />
            </label>
            {
                selectedImage &&
                <div className="ml-1 mt-5">
                    <Image src={imagePreview} alt={props.alt} layout={props.layout} width={props.width} height={props.height} className={props.className} />
                </div>
            }
        </>
    )
}