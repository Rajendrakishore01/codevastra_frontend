// src/pages/Gallery.jsx
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";

/**
 * galleryData: keys = event ids, values = array of filenames placed under public/gallery/
 * Example: public/gallery/1.jpg  -> use "/gallery/1.jpg" below
 */
const galleryData = {
  "codewars-stage1": [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
    "/gallery/7.jpg",
    "/gallery/8.jpg",
    "/gallery/9.jpg",
    "/gallery/10.jpg",
    "/gallery/11.jpg",
    "/gallery/12.jpg",
    "/gallery/13.jpg",
    "/gallery/14.jpg",
    "/gallery/15.jpg",
  ],
  "codewars-stage2": [],
};

// small placeholder you should add to public/ as well: public/gallery-placeholder.png
const PLACEHOLDER = "/gallery-placeholder.png";

export default function Gallery() {
  const { id } = useParams();
  const photos = galleryData[id] || [];
  const [preview, setPreview] = useState(null);

  // When an <img> fails to load, this swaps to a local placeholder and logs the failed src.
  const handleImgError = (e) => {
    const imgEl = e.currentTarget;
    const failedSrc = imgEl.src;
    // only replace once to avoid infinite loop if placeholder missing
    if (!failedSrc.includes("gallery-placeholder")) {
      console.warn("Image failed to load:", failedSrc);
      imgEl.src = PLACEHOLDER;
      imgEl.classList.add("object-contain");
    }
  };

  // open preview (simple wrapper so you can add logging)
  const openPreview = (img) => {
    console.log("Opening preview:", img);
    setPreview(img);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffdf6]">
      {/* MAIN - flex-grow pushes footer down */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/events" className="text-sm text-orange-600 hover:underline">
            ← Back to Events
          </Link>
          <h2 className="text-2xl font-bold">{id}</h2>
        </div>

        <p className="text-sm text-slate-600 mb-6">Photos from the event.</p>

        {photos.length === 0 ? (
          <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
            No photos available for this event yet.
          </div>
        ) : (
          <>
            {/* Main grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt={img}
                  onError={handleImgError}
                  className="w-full h-56 object-cover rounded-lg shadow-md cursor-pointer"
                  onClick={() => openPreview(img)}
                />
              ))}
            </div>

            {/* Filmstrip thumbnails */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">More photos</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {photos.map((img) => (
                  <img
                    key={img + "-thumb"}
                    src={img}
                    alt={img}
                    onError={handleImgError}
                    className="w-32 h-20 object-cover rounded-md shadow-sm cursor-pointer"
                    onClick={() => openPreview(img)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Preview modal */}
        {preview && (
          <div
            // Only close when user clicks the backdrop itself
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setPreview(null);
              }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          >
            <img
              src={preview}
              alt="preview"
              onError={(e) => {
                console.warn("Preview failed to load:", preview);
                e.currentTarget.src = PLACEHOLDER;
              }}
              // Prevent click on image from bubbling to the backdrop (so it doesn't close)
              onClick={(e) => e.stopPropagation()}
              className="max-w-[95%] max-h-[95%] rounded-lg shadow-xl object-contain"
            />
          </div>
        )}
      </main>


    </div>
  );
}
