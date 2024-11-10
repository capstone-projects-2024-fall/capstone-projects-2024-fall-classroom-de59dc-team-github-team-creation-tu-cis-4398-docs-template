import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";

// Color Design Tokens
// export const tokens = (mode) => ({
//   ...(mode === "dark"
//     ? {
//         gray: {
//           100: "#e0e0e0",
//           200: "#c2c2c2",
//           300: "#a3a3a3",
//           400: "#858585",
//           500: "#666666",
//           600: "#525252",
//           700: "#3d3d3d",
//           800: "#292929",
//           900: "#141414",
//         },
//         primary: {
//           100: "#d0d1d5",
//           200: "#a1a4ab",
//           300: "#727681",
//           400: "#434957",
//           500: "#141b2d",
//           600: "#101624",
//           700: "#0c101b",
//           800: "#080b12",
//           900: "#040509",
//         },
//         greenAccent: {
//           100: "#dbf5ee",
//           200: "#b7ebde",
//           300: "#94e2cd",
//           400: "#70d8bd",
//           500: "#4cceac",
//           600: "#3da58a",
//           700: "#2e7c67",
//           800: "#1e5245",
//           900: "#0f2922",
//         },
//         redAccent: {
//           100: "#f8dcdb",
//           200: "#f1b9b7",
//           300: "#e99592",
//           400: "#e2726e",
//           500: "#db4f4a",
//           600: "#af3f3b",
//           700: "#832f2c",
//           800: "#58201e",
//           900: "#2c100f",
//         },
//         blueAccent: {
//           100: "#e1e2fe",
//           200: "#c3c6fd",
//           300: "#a4a9fc",
//           400: "#868dfb",
//           500: "#6870fa",
//           600: "#535ac8",
//           700: "#3e4396",
//           800: "#2a2d64",
//           900: "#151632",
//         },
//       }
//     : {
//         gray: {
//           100: "#141414",
//           200: "#292929",
//           300: "#3d3d3d",
//           400: "#525252",
//           500: "#666666",
//           600: "#858585",
//           700: "#a3a3a3",
//           800: "#c2c2c2",
//           900: "#e0e0e0",
//         },
//         primary: {
//           100: "#040509",
//           200: "#080b12",
//           300: "#0c101b",
//           400: "#fcfcfc",
//           500: "#f2f0f0",
//           600: "#434957",
//           700: "#727681",
//           800: "#a1a4ab",
//           900: "#d0d1d5",
//         },
//         greenAccent: {
//           100: "#0f2922",
//           200: "#1e5245",
//           300: "#2e7c67",
//           400: "#3da58a",
//           500: "#4cceac",
//           600: "#70d8bd",
//           700: "#94e2cd",
//           800: "#b7ebde",
//           900: "#dbf5ee",
//         },
//         redAccent: {
//           100: "#2c100f",
//           200: "#58201e",
//           300: "#832f2c",
//           400: "#af3f3b",
//           500: "#db4f4a",
//           600: "#e2726e",
//           700: "#e99592",
//           800: "#f1b9b7",
//           900: "#f8dcdb",
//         },
//         blueAccent: {
//           100: "#e1e2fe",
//           200: "#c3c6fd",
//           300: "#a4a9fc",
//           400: "#868dfb",
//           500: "#6870fa",
//           600: "#535ac8",
//           700: "#3e4396",
//           800: "#2a2d64",
//           900: "#151632",
//         },
//       }),
// });

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        gray: {
          100: "#f0f0f0", // lighter gray
          200: "#d9d9d9",
          300: "#c2c2c2",
          400: "#ababab",
          500: "#949494", // medium gray
          600: "#7d7d7d",
          700: "#666666", // darker gray
          800: "#4f4f4f",
          900: "#383838",
        },
        primary: {
          100: "#e8efff", // very light blue
          200: "#d0e0ff",
          300: "#b8d1ff",
          400: "#a0c2ff",
          500: "#88b3ff", // soft blue
          600: "#709aff",
          700: "#5881ff", // deeper blue
          800: "#4068ff",
          900: "#284fff",
          1000: "D1E7FB"
        },
        greenAccent: {
          100: "#e8f9f1",
          200: "#d1f3e3",
          300: "#baedd5",
          400: "#a3e7c7",
          500: "#8ce1b9", // greenish accent
          600: "#75dbab",
          700: "#5ed59d",
          800: "#47cf8f",
          900: "#30c981",
          
        },
        redAccent: {
          100: "#fce8e8",
          200: "#f9d1d1",
          300: "#f6baba",
          400: "#f3a3a3",
          500: "#f08c8c", // reddish accent
          600: "#ed7575",
          700: "#ea5e5e",
          800: "#e74747",
          900: "#e43030",
        },
        blueAccent: {
          100: "#f0f8ff",
          200: "#e0f1ff",
          300: "#d0eaff",
          400: "#c0e3ff",
          500: "#b0dcff", // light blue accent
          600: "#a0d5ff",
          700: "#90ceff",
          800: "#80c7ff",
          900: "#70c0ff",
        },
      }
    : { // Light mode colors can mirror Dark or be adjusted separately
        gray: {
          100: "#f0f0f0",
          200: "#d9d9d9",
          300: "#c2c2c2",
          400: "#ababab",
          500: "#949494",
          600: "#7d7d7d",
          700: "#666666",
          800: "#4f4f4f",
          900: "#383838",
        },
        primary: {
          100: "#e8efff",
          200: "#d0e0ff",
          300: "#b8d1ff",
          400: "#a0c2ff",
          500: "#88b3ff",
          600: "#709aff",
          700: "#5881ff",
          800: "#4068ff",
          900: "#284fff",
        },
        greenAccent: {
          100: "#e8f9f1",
          200: "#d1f3e3",
          300: "#baedd5",
          400: "#a3e7c7",
          500: "#8ce1b9",
          600: "#75dbab",
          700: "#5ed59d",
          800: "#47cf8f",
          900: "#30c981",
        },
        redAccent: {
          100: "#fce8e8",
          200: "#f9d1d1",
          300: "#f6baba",
          400: "#f3a3a3",
          500: "#f08c8c",
          600: "#ed7575",
          700: "#ea5e5e",
          800: "#e74747",
          900: "#e43030",
        },
        blueAccent: {
          100: "#f0f8ff",
          200: "#e0f1ff",
          300: "#d0eaff",
          400: "#c0e3ff",
          500: "#b0dcff",
          600: "#a0d5ff",
          700: "#90ceff",
          800: "#80c7ff",
          900: "#70c0ff",
        },
      }),
});

// Mui Theme Settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[900],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.gray[700],
              main: colors.gray[500],
              light: colors.gray[100],
            },
            background: {
              default: colors.primary[100],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[900],
            },
            neutral: {
              dark: colors.gray[700],
              main: colors.gray[500],
              light: colors.gray[100],
            },
            background: {
              default: colors.primary[200],
            },
          }),
    },
    typography: {
      fontFamily: ["Roboto", "Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Roboto", "Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Roboto", "Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Roboto", "Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// Context For Color Mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(() => ({
    toggleColorMode: () =>
      setMode((prev) => (prev === "light" ? "dark" : "light")),
  }));

  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));

  return [theme, colorMode];
};
