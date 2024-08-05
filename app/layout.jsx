//Main layout @ means root directory of the project
import "@/assets/styles/globals.css"

//Meta tags
export const metadata = {
  title: 'Dynamik Properties',
  description: 'Find the best Dynamik Properties',
  keywords: ['Dynamik Properties', 'real estate', 'properties',  'buy', 'sell'],
  icons: {
    icon: "/images/icon.png",
  },
};

const MainLayout =({children}) => {
  return (
    <html lang='en'>
    <body>
      <main>{children}</main>
    </body>
  </html>
  )
}



export default MainLayout