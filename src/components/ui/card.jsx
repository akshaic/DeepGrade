const Card = ({ children }) => (
  <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      {children}
  </div>
);

const CardContent = ({ children }) => (
  <div className="text-gray-800">
      {children}
  </div>
);

export { Card, CardContent };
