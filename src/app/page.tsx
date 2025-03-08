import Link from 'next/link';

const Home = () => { 
  return (
    <div className= "flex min-h-screen items-center justify-center bg-yellow-400">
     Click <Link href="/documents/123">&nbsp;here &nbsp; </Link> to go to document id 
    </div>
  );
}

export default Home;