import "@/assets/styles/globals.css"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Meta tags
export const metadata = {
  title: 'Dynamik Properties',
  description: 'Find the best Dynamik Properties',
  keywords: ['Dynamik Properties', 'real estate', 'properties',  'buy', 'sell'],
  icons: {
    icon: "/images/icon.png",
  },
};

const MainLayout = ({ children }) => {
  return (
    //lets now wrap our layout with the AuthProvider
    <AuthProvider>
     
    <html lang='en'>
      <head>
        <script src="https://www.google.com/recaptcha/api.js" async defer />
      </head>
      <body className="bg-neutral-50">
        <main>
          <Header />
          <ToastContainer 
          position="top-center" 
          
          hideProgressBar={false}
           /> {/* Add this line to your layout to use the toast */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
    </AuthProvider>
  )
}

export default MainLayout