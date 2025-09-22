const LanguagesList = ({ languages }: { languages: Record<string, number> }) => {
  return (
    <>
      {Object.entries(languages).map((languagesArray, i) => {
        const [language] = languagesArray;

        if (language === "total") return null;

        return (
          <span key={i} id={i.toString()}>
            {language}
            {i < Object.entries(languages).length - 1 ? " | " : ""}
          </span>
        );
      })}
    </>
  );
};

export default LanguagesList;
