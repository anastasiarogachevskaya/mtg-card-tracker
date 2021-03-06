import React, { useCallback, useEffect, useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderImg?: string;
  errorImg?: string;
}

export default ({ src, placeholderImg, ...props }: ImageProps) => {
  const [imgSrc, setSrc] = useState(placeholderImg || src);
  const onLoad = useCallback(() => {
    setSrc(src);
  }, [src]);
  const onError = useCallback(() => {
    setSrc(placeholderImg);
  }, [placeholderImg]);
  useEffect(() => {
    const img = new Image();
    img.src = src as string;
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src, onLoad, onError]);
  return <img {...props} alt={imgSrc} src={imgSrc} loading="lazy" />;
};