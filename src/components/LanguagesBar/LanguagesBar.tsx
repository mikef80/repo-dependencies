const LanguagesBar = ({ languages }: { languages: Record<string, number> }) => {
  const total = Object.values(languages).reduce<number>((acc, val) => acc + val, 0);

  const colors: Record<string, string> = {
    JavaScript: "#facc15", // yellow
    TypeScript: "#3b82f6", // blue
    HTML: "#ef4444", // red
    CSS: "#10C74D", // green
    SCSS: "#f472b6", // pink
    Java: "#fb923c", // orange
    Default: "#60a5fa", //lightblue
  };

  return (
    <>
      {Object.entries(languages).map((languagesArray, i) => {
        const [language, count] = languagesArray;
        const width = (count / total) * 100;

        return (
          <div
            key={i}
            style={{
              width: `${width}%`,
              backgroundColor: colors[language] || colors.Default,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "12px",
              height: "5px",
            }}
            title={`${language}: ${count}`}>
          </div>
        );
      })}
    </>
  );
};

export default LanguagesBar;
