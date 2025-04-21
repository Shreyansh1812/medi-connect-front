
import SidebarNav from "@/components/SidebarNav";

const Index = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarNav />
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to MediTrack</h1>
          <p className="text-xl text-gray-600">Your healthcare management system dashboard.</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
