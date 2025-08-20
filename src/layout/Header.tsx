const Header = () => {
  return (
    <header className='py-12'>
      <div className='text-center'>
        <h2 className='text-6xl font-extrabold uppercase break-words'>FDT Report Generator</h2>
        <p className='text-lg w-9/12 mx-auto mt-2'>
          This tool generates productivity reports for your kitchens using KSRS data. To ensure that
          colors are retained when printing, please enable both &quot;<i>Headers and Footers</i>
          &quot; and &quot;<i>Background Graphic</i>s&quot; in your print settings.
        </p>
      </div>
    </header>
  );
};

export default Header;
