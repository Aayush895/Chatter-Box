import BrandPanel from './BrandPanel';
import Registration from './Registration';

function AuthPage() {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#14111F]">
      <BrandPanel />
      <div className="divider divider-horizontal hidden lg:flex m-0"></div>
      <Registration />
    </div>
  );
}
export default AuthPage;