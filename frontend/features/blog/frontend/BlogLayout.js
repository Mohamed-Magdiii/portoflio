import { createContext, useContext, useEffect, useState } from "react";
import TopNavComponent from "../../layout/frontend/TopNavComponent";
import Footer from "../../layout/frontend/Footer";
import { defaultContent } from "../../_shared/frontend/defaultContent";
import { API_URL } from "../../_shared/frontend/api";

const ContentContext = createContext(null);

export const useContent = () => useContext(ContentContext);

const BlogLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/api/content`)
      .then((res) => res.json())
      .then((data) => {
        if (active) setContent({ ...defaultContent, ...data });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const site = content.site || defaultContent.site;

  return (
    <ContentContext.Provider value={content}>
      <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-800 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">
        <div className="blob blob-teal left-[-10%] top-[-5%] h-96 w-96" />
        <div className="blob blob-indigo right-[-12%] top-[35%] h-[28rem] w-[28rem]" />

        <TopNavComponent
          handleClick={() => setDarkMode((d) => !d)}
          darkMode={darkMode}
          content={content.hero || defaultContent.hero}
          site={site}
        />

        <main className="relative mx-auto max-w-6xl px-6 lg:px-8">{children}</main>

        <Footer site={site} />
      </div>
    </ContentContext.Provider>
  );
};

export default BlogLayout;
