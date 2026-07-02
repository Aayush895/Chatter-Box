import BrandPanel from './BrandPanel';
import Registration from './Registration';

function AuthPage() {
  return (
    <>
      {/* BrandPanel contains the typewriter preview & Registrataion contains the forms for signup and login */}
      <div className="flex w-full h-screen bg-[#14111F]">
        <BrandPanel />
        <div className="divider divider-horizontal"></div>
        <Registration />
      </div>
    </>
  );
}
export default AuthPage;
