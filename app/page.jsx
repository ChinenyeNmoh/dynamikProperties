import Link from 'next/link'
import InfoBoxes from '@/components/InfoBoxes'
import Hero from '@/components/Hero'


const Homepage = () => {
  console.log('Homepage')
  return (
    <div>
      <Hero />
      <InfoBoxes />
    </div>
  )
}

export default Homepage