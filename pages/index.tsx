import { useState, useEffect } from 'react';
import { IoMdCopy, IoIosShuffle } from "react-icons/io";
import { IoSaveOutline, IoTrashOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { Button } from '@/components/ui/button';

const ColorPaletteGenerator: React.FC = () => {
  const [colors, setColors] = useState<string[]>(["#FFFFFF", "#000000", "#808080"]);
  const [favoritePalettes, setFavoritePalettes] = useState<string[][]>([]);

  useEffect(() => {
    const storedPalettes = localStorage.getItem("favoritePalettes");
    if (storedPalettes) {
      try {
        const parsedPalettes: string[][] = JSON.parse(storedPalettes);
        if (Array.isArray(parsedPalettes)) {
          setFavoritePalettes(parsedPalettes);
        }
      } catch (error) {
        console.error("Error parsing favorite palettes:", error);
      }
    }
  }, []);

  const generateRandomColors = () => {
    const newColors: string[] = [];
    for (let i = 0; i < 5; i++) {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      newColors.push(randomColor);
    }
    setColors(newColors);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color)
  };

  const savePalette = () => {
    const newFavoritePalettes = [...favoritePalettes, colors];
    setFavoritePalettes(newFavoritePalettes);
    localStorage.setItem("favoritePalettes", JSON.stringify(newFavoritePalettes));
  };

  const removePalette = (palette: string[]) => {
    const newFavoritePalettes = favoritePalettes.filter((p) => p.join("") !== palette.join(""));
    setFavoritePalettes(newFavoritePalettes);
    localStorage.setItem("favoritePalettes", JSON.stringify(newFavoritePalettes));
  };

  return (
    <section className="min-h-screen bg-[#F8FAFA] p-4 rounded-2xl">
      <div className="content-center p-4">
        <header>
          <h1 className="text-3xl mb-4 font-semibold">Color Palette Generator</h1>
        </header>

        <div className="flex flex-wrap flex-col bg-white p-4 rounded-lg">
          <h2 className="text-2xl mb-4 font-semibold">
            New Palette
          </h2>

          <div className="flex flex-wrap gap-4 mb-4 rounded-lg flex items-center">
            {colors.map((color, index) => (
              <div key={index} className="w-[240px] h-[175px] p-2 border border-solid border-gray-100 shadow-md flex relative rounded-lg flex-col items-center">
                <div className="rounded-lg w-[224px] h-[123px]" style={{ backgroundColor: color }}>
                  <div className="flex justify-end">
                    <button
                      className="absolute text-xs text-white p-2 bg-transparent rounded-lg"
                      onClick={() => copyColor(color)}
                    >
                      <IconContext.Provider value={{ size: "2em" }}>
                        <div>
                          <IoMdCopy />
                        </div>
                      </IconContext.Provider>
                    </button>
                  </div>
                </div>

                <p className="pt-2 text-[#47474f] text-[14px]">{color}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 items-center justify-center mt-4">
            <Button
              variant="secondary"
              onClick={generateRandomColors}
            >
              <IoIosShuffle />

              Generate Random Colors
            </Button>

            <Button onClick={savePalette}>
              <IoSaveOutline />

              Save Palette
            </Button>
          </div>
        </div>

        {favoritePalettes.length > 0 && (
          <div className="flex flex-wrap flex-col bg-white p-4 mt-8 rounded-lg">
            <h2 className="text-2xl mb-4 font-semibold mb-4">Favorite Palettes</h2>

            <div className="flex flex-col flex-wrap gap-4">
              {favoritePalettes.map((palette, index) => (
                <div key={index} className="flex flex-wrap gap-4 items-center">
                  {palette.map((color) => (
                    <div key={index} className="border border-solid w-[140px] h-[100px] p-2 border-gray-100 shadow-md flex relative rounded-lg flex-col items-center">
                      <div className="rounded-lg w-[130px] h-[70px]" style={{ backgroundColor: color }} />

                      <p className="pt-2 text-[#47474f] text-[14px]">{color}</p>
                    </div>
                  ))}

                  <Button
                    className="h-[100px] text-white font-bold px-4 rounded"
                    variant="secondary"
                    onClick={() => removePalette(palette)}
                  >
                    <IconContext.Provider value={{ color: "black" }}>
                      <div>
                        <IoTrashOutline />
                      </div>
                    </IconContext.Provider>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ColorPaletteGenerator;
