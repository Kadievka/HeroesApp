import React from "react";
import { useLocation, Location } from "react-router-dom";

const ErrorScreen = () => {
  const { pathname }: Location = useLocation();

  return (
    <div data-testid="error-screen-container">
      <h4 data-testid="error-404-message">Error 404: No se encontrĂ³ &quot;{`${pathname}`}&quot;</h4>
    </div>
  );
};

export default ErrorScreen;
