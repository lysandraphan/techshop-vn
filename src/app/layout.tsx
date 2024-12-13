import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";

// internal
import theme from "../theme";
import StoreProvider from "../redux/StoreProvider";

// component
import Header from "@/components/header/header.component";
import Footer from "@/components/footer/footer.component";

/// style
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "TechShopVN",
  description: "An e-commerce site for selling electronic devices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <body className={poppins.className}>
            <StoreProvider>
              <Header />
              {children}
              <Footer />
            </StoreProvider>
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
