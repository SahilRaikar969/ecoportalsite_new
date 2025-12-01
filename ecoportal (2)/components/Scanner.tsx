import React, { useRef, useState, useEffect } from 'react';

export const Scanner: React.FC<{ onScan?: (val: string) => void }> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [lastScanned, setLastScanned] = useState<string | null>(null);

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera API unavailable");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setActive(true);
      }
    } catch (e) {
      alert("Camera permission denied or unavailable");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    setActive(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-emerald-900">QR Scanner</h4>
        <div className="flex gap-2">
          {!active ? (
            <button onClick={startCamera} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700">Open Scanner</button>
          ) : (
            <button onClick={stopCamera} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600">Stop</button>
          )}
        </div>
      </div>
      
      <div className="relative bg-black rounded-lg overflow-hidden min-h-[200px] flex items-center justify-center">
         <video 
           ref={videoRef} 
           autoPlay 
           muted 
           playsInline 
           className={`w-full h-full object-cover ${active ? 'block' : 'hidden'}`}
         />
         {!active && <p className="text-gray-400 text-sm">Camera inactive</p>}
      </div>
      
      {lastScanned && (
        <div className="mt-2 text-sm text-emerald-800 font-medium">
          Last scanned: {lastScanned}
        </div>
      )}
    </div>
  );
};
