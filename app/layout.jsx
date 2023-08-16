import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Loading from './loading';
import { Suspense } from 'react';

export const metadata = {
  title: "Abundance of Prompts",
  description: "Discover & Share AI prompts"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
        <div className='main'>
        <div className="gradient"/>
        </div>
        
        <main className='app'>
          <Nav/>
          <Suspense fallback={<Loading/>}>
          {children}
          </Suspense>
        </main>
        </Provider>

      </body>
    </html>
  )
}

export default RootLayout;