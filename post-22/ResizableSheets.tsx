import { useState, useRef } from "preact/hooks";

interface Sheet {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  opacity: number;
}

interface DragData {
  id: number;
  startMouseX: number;
  startMouseY: number;
}

interface ResizeData {
  id: number;
  startMouseX: number;
  startMouseY: number;
  startWidth: number;
  startHeight: number;
}

export default function ResizableSheets() {
  const [activeSheet, setActiveSheet] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const colours: Record<number, string> = {
    1: "#3384ed",
    2: "#c41a6c",
    3: "#dcd924",
    4: "#6E5E66",
    5: "#753174",
    6: "#D91427",
    7: "#7D8777",
    8: "#a3e335",
    9: "#415132",
    10: "#6f16c2",
  };

  const [sheets, setSheets] = useState<Sheet[]>([
    {
      id: 1,
      x: 0,
      y: 0,
      w: 150,
      h: 75,
      color: "#3384ed",
      opacity: 1,
    },
  ]);

  const dragData = useRef<DragData | null>(null);
  const resizeData = useRef<ResizeData | null>(null);

  const handleMouseDown = (e: MouseEvent, id: number) => {
    e.preventDefault();

    if (!containerRef.current) return;

    dragData.current = {
      id: id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
    };

    setActiveSheet(id);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleResizeMouseDown = (e: MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    // We need to find our sheet to give the initial width and height
    const sheet = sheets.find((sheet) => sheet.id == id);

    if (sheet) {
      resizeData.current = {
        id: id,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startWidth: sheet.w,
        startHeight: sheet.h,
      };
    }

    setActiveSheet(id);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    
    if (dragData.current && containerRef.current) {
      const { id, startMouseX, startMouseY } = dragData.current;
      const rect = containerRef.current.getBoundingClientRect();

      const sheet = sheets.find((sheet) => sheet.id === id);

      if (!sheet) return;

      const rawX = sheet.x + e.clientX - startMouseX;
      const rawY = sheet.y + e.clientY - startMouseY;

      const clampedX = Math.max(
        0,
        Math.min(rawX, rect.width - sheet.w)
      );

      const clampedY = Math.max(
        0,
        Math.min(rawY, rect.height - sheet.h)
      );

      setSheets((prevSheets) =>
        prevSheets.map((sheet) =>
          sheet.id === id
            ? {
                ...sheet,
                x: clampedX,
                y: clampedY,
              }
            : sheet
        )
      );
    }

    if (resizeData.current != null && containerRef.current) {
      const {
        id,
        startMouseX,
        startMouseY,
        startWidth,
        startHeight,
      } = resizeData.current;

      const rect = containerRef.current.getBoundingClientRect();

      const sheet = sheets.find((sheet) => sheet.id === id);

      if (!sheet) return;

      const maxWidth = rect.width - sheet.x;
      const maxHeight = rect.height - sheet.y;

      const newWidth = Math.max(
        100,
        Math.min(
          maxWidth,
          startWidth + (e.clientX - startMouseX)
        )
      );

      const newHeight = Math.max(
        75,
        Math.min(
          maxHeight,
          startHeight + (e.clientY - startMouseY)
        )
      );

      setSheets((prevSheets) =>
        prevSheets.map((sheet) =>
          sheet.id === id
            ? {
                ...sheet,
                w: newWidth,
                h: newHeight,
              }
            : sheet
        )
      );
    }
  };

  const handleMouseUp = () => {
    dragData.current = null;
    resizeData.current = null;
    setActiveSheet(null);

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const addSheet = () => {
    if (containerRef.current != null) {
      const rect = containerRef.current.getBoundingClientRect();

      setSheets((currentSheets) => {
        const nextId =
          Math.max(
            0,
            ...currentSheets.map((sheet) => sheet.id)
          ) + 1;

        const horizontalOffset =
          Math.random() * (rect.width / 2);

        const verticalOffset =
          Math.random() * (rect.height / 2);

        return [
          ...currentSheets,
          {
            id: nextId,
            x: horizontalOffset,
            y: verticalOffset,
            w: 150,
            h: 75,
            color:
              colours[((nextId - 1) % 10) + 1] ?? "red",
            opacity: 1,
          },
        ];
      });
    }
  };

  const deleteSheet = (id: number) => {
    if (activeSheet === id) setActiveSheet(null);

    setSheets((prev) =>
      prev.filter((sheet) => sheet.id !== id)
    );
  };

  const deleteAllSheets = () => {
    setActiveSheet(null);
    setSheets([]);
  };

  return (
    <div
      ref={containerRef}
      class="outer-container text-right flex flex-col justify-between relative h-100 border-1"
    >
      <div className="flex justify-end p-2">
        <button
          className="relative cursor-pointer hover:bg-green-400 transition-colors border-1 p-1 mb-3 mr-3 z-20 rounded-md"
          onClick={addSheet}
        >
          Add Sheet
        </button>

        <button
          className="relative cursor-pointer hover:bg-red-400 transition-colors border-1 p-1 mb-3 mr-3 z-20 mt-auto rounded-md"
          onClick={deleteAllSheets}
        >
          Delete all sheets
        </button>
      </div>

      {sheets.map((sheet: Sheet) => {
        return (
          <div
            className="sheet"
            onMouseDown={(e) =>
              handleMouseDown(e, sheet.id)
            }
            key={sheet.id}
            style={{
              position: "absolute",
              left: sheet.x,
              top: sheet.y,
              width: sheet.w,
              height: sheet.h,
              background: sheet.color,
              opacity: sheet.opacity,
              cursor:
                sheet.id == activeSheet
                  ? "grabbing"
                  : "grab",
              userSelect: "none",
              zIndex: 1,
            }}
          >
            <button
              className={`relative cursor-pointer shadow-md hover:bg-red-400 transition-colors border-[${sheet.color}] p-0.5 m-1 rounded-md`}
              onClick={() => deleteSheet(sheet.id)}
            >
              🗑️
            </button>

            <p
              style={{
                display: "flex",
                fontSize: "1.2rem",
                alignItems: "",
                justifyContent: "center",
              }}
            >
              Sheet {sheet.id}
            </p>

            <div
              onMouseDown={(e) =>
                handleResizeMouseDown(e, sheet.id)
              }
              style={{
                cursor: "nwse-resize",
                borderLeft: "0px",
                borderTop: "0px",
                borderWidth: "3px",
              }}
              className="absolute bottom-0 right-0 w-3 h-3 border-1"
            ></div>
          </div>
        );
      })}

      <p className="z-20 gap-5 text-center">
        <span className="text-2xl" style={{ color: "#3384ed" }}>I</span>{" "}
        <span className="text-2xl" style={{ color: "#c41a6c" }}>will</span>{" "}
        <span className="text-2xl" style={{ color: "#dcd924" }}>conquer</span>{" "}
        <span className="text-2xl" style={{ color: "#6E5E66" }}>the</span>{" "}
        <span className="text-2xl" style={{ color: "#753174" }}>terminal</span>{" "}
        <span className="text-2xl" style={{ color: "#D91427" }}>and</span>{" "}
        <span className="text-2xl" style={{ color: "#7D8777" }}>become</span>{" "}
        <span className="text-2xl" style={{ color: "#a3e335" }}>a</span>{" "}
        <span className="text-2xl" style={{ color: "#415132" }}>better</span>{" "}
        <span className="text-2xl" style={{ color: "#6f16c2" }}>developer</span>
      </p>
    </div>
  );
}