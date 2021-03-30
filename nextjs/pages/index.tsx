import { NextPage } from 'next'
import App from 'next/app'

type HomePageProps = {
  dummy: {
    name: string
  }
}

const Home: NextPage<HomePageProps> = ({ dummy }) => {
  return <h1>Name: {dummy.name}</h1>
}

export const getServerSideProps = async () => {
  // const res: Response = await fetch(`http://localhost:3000/api`)
  const dummy = { name: 'Jordan' } // await res.json()
  return { props: { dummy } }
}

export default Home
