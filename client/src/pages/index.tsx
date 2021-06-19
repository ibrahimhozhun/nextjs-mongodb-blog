import React, { useEffect, useState } from "react";
import { storage } from "../config/firebase";
import Image from "next/image";
import Link from "next/link";
import ImageSkeleton from "../components/ImageSkeleton";

interface IFile {
  name: string;
  url: string;
  type: string;
  createdAt: string;
}

const Home: React.FC = () => {
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
      <div className="glass-card-container">
        <h1 className="card-title">Stay Special</h1>
        <div className="card-grid">
          <p className="card-subtitle">
            Not a bully, But a<span className="highlight"> Friend</span>
          </p>
          <div className="button-group">
            <Button
              link="/about"
              label="Learn more about us"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <Button
              link="/posts"
              label="Check out our journey"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>
      <div className="glass-card-container mt-4 lg:mt-8">
        <div className="image-grid">
          <h2 className="image-grid-title">Our Work</h2>
          {loading ? (
            <>
              <ImageSkeleton />
              <ImageSkeleton />
              <ImageSkeleton />
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

const Button: React.FC<{
  link: string;
  label: string;
  icon?: React.ReactNode;
}> = ({ link, label, icon }) => {
  return (
    <Link href={link}>
      <button className="cta-btn-yellow">
        {label}
        <span>{icon && icon}</span>
      </button>
    </Link>
  );
};

export default Home;
