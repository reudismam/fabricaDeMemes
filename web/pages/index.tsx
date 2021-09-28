import Head from 'next/head'
import {useDropzone} from 'react-dropzone';
import styles from '../styles/Home.module.css'
import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(500);

  useEffect(() => {
    if (images && images.length > 0) {
      const firstImage = images[0];
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      var image = new Image();

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        setCanvasWidth(image.width);
        setCanvasHeight(image.height);
        context.drawImage(image, 0, 0, image.width, image.height);
      }

      image.src = firstImage;
    }
  }, [images]);

  function onDrop(files: File[]) {
    if (files && files.length > 0) {
      files.map((file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          alert(files.length);
          const imagesUpdate = [String(e.target.result), ... images]
          setImages(imagesUpdate);
        }
        reader.readAsDataURL(file);
        return file;
      });
    }
  }
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: ["image/*"]});
  const {
    canvasRef
  } = useContext(HomeContext);
  return (
    <div className={styles.main}>
      <div className={styles.imageContainer} {...getRootProps()}>
          <input {...getInputProps()}/>
          <canvas className={styles.imageDropper} 
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          >

          </canvas>
      </div>
      {images &&
        images.map((image) => {
          return (
            <div>
              <img src={image} alt="uploaded image."/>
            </div>
          );
        })
      }
    </div>
  )
}
