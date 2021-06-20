import ImageSkeleton from "../components/ImageSkeleton";
import React, { useEffect, useState } from "react";
import { storage } from "../config/firebase";
import Image from "next/image";

interface IFile {
  name: string;
  url: string;
  type: string;
  createdAt: string;
}

const Outputs: React.FC = () => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  // Storage Reference
  const storageRef = storage.ref();

  const getFiles = async () => {
    // Reset states
    setError(false);
    setFiles([]);
    setLoading(true);

    try {
      // Get all files from storage
      const files = await storageRef.listAll();
      // Map through all files to get just required information
      files.items.map(async (_file) => {
        // Get metadata about file
        const metadata = await _file.getMetadata();

        const file: IFile = {
          name: _file.name,
          url: await _file.getDownloadURL(),
          type: metadata.contentType,
          createdAt: metadata.timeCreated,
        };
        // Add file
        setFiles((prevFiles) => [...prevFiles, file]);
      });
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @param filename name of the file
   * @returns filename without the extension
   */
  const getFileNameWithoutExtension = (filename: string): string => {
    // Get last index of point mark, because it's dividing name and extension
    const pointIdx = filename.lastIndexOf(".");

    // If it can't find a point mark, it will return -1
    if (pointIdx > 0) {
      // Cut file extension and return filename
      return filename.slice(0, pointIdx).trim();
    } else {
      // If there is no point mark, return just filename
      return filename;
    }
  };

  useEffect(() => {
    // Get all files at first render of the component
    getFiles();
  }, []);

  return (
    <>
      <h1 className="page-title">Our Work</h1>
      <div className="glass-card-container grid gap-y-6 xl:grid-cols-2">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl mb-4">Project logo prepared by our school</h1>
          <Image src="/images/logo.jpeg" width="300" height="300" />
        </div>
        <div className="flex items-center flex-col justify-around">
          <h1 className="text-2xl mb-4">Animation about our project</h1>
          <video
            src="https://firebasestorage.googleapis.com/v0/b/erasmus-blog-a7567.appspot.com/o/others%2Fbullying.webm?alt=media&token=fda39950-f9a1-4295-8680-f6110c8d670c"
            width="500"
            controls
          />
        </div>
      </div>
      <div className="glass-card-container mt-4 lg:mt-8">
        <div className="image-grid">
          <h1 className="image-grid-title">Banners & Posters</h1>
          {loading ? (
            <>
              {/* Render ImageSkeleton component 6 times */}
              {[...new Array(6)].map((_, idx) => (
                <ImageSkeleton key={idx} />
              ))}
            </>
          ) : error ? (
            <p className="text-red-600 text-xl">There is an error occurred</p>
          ) : (
            // Sort files by date
            files
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((file) => (
                <div key={file.url} className="col-span-1">
                  {/* Be sure that we are rendering an image */}
                  {file.type.includes("image") && (
                    <Image
                      src={file.url}
                      alt={getFileNameWithoutExtension(file.name)}
                      width={400}
                      height={500}
                    />
                  )}
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
};

export default Outputs;
