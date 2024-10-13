import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RandomQuiz from '@/components/RandomQuiz';
import SummaryReport from '@/components/SummaryReport';
import Chat from '@/components/Chat';

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-background">
    <Header />

    <div className="flex-grow bg-background grid grid-cols-3 grid-rows-2 gap-4 p-3 overflow-hidden">
      <div className="bg-cellbackground p-4 border-2 border-tertiary rounded-lg">
        <RandomQuiz />
      </div>
      <div className="bg-cellbackground p-4 border-2 border-tertiary rounded-lg">
        Item 2
      </div>
      <div className="bg-cellbackground p-4 border-2 border-tertiary rounded-lg">
        Item 3
      </div>
      <div className="grid col-span-2">
        <SummaryReport />
      </div>
      {/* <div className="bg-cellbackground p-4 border-2 border-tertiary rounded-lg"> */}
      <div className="grid col-span-1">
        <Chat />
      </div>
    </div>

    <Footer />
  </div>
  );
}
