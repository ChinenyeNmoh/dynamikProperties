
const propertyPage = ({searchParams}) => {
    console.log(searchParams.name || 'No name')
  return (
    <div>
        Property Page: {searchParams.name || 'No name'}
    </div>
  )
}

export default propertyPage