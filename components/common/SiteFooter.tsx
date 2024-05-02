import Link from 'next/link';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from '@mui/material/IconButton';

export default function SiteFooter({ currentPage }: { currentPage: string }) {
  const footerStyle = currentPage === "home" || currentPage === "about" ? "border-l-[5px] border-r-[5px]" : ""; // Adjust border styles for Home and About pages

  return (
    <footer className={`bg-ais-new-darker-blue text-ais-white pt-6 px-[20px] pb-[2rem] w-[100%] ${footerStyle}`}>
      <div className="border-white border-b-2 flex justify-between py-4 max-w-[1400px] mx-[4rem] 2xl:mx-auto">
        <div className="grid grid-col-1 grid-flow-row py-2">
          <img src="/images/Logos/ais_logo_white.png" className="h-[4rem] object-cover hidden sm:block"/>
        </div>
        <div>
          <img src="/images/Logos/demystify-ai.png" className="mb-4 h-[1.8rem] object-cover ml-auto"/>
          <ul>
            <div className='flex'>
              <div>
                <IconButton
                  onClick={() => {
                    window.open('/insta', '_blank');
                  }}
                >
                  <InstagramIcon className="h-6 text-ais-white" />
                </IconButton>
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    window.open('/linkedin', '_blank');
                  }}
                >
                  <LinkedInIcon className="h-6 text-ais-white" />
                </IconButton>
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    window.open('/yt', '_blank');
                  }}
                >
                  <YouTubeIcon className="h-6 text-ais-white" />
                </IconButton>
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    window.open('/dc', '_blank');
                  }}
                >
                  <img src="/images/Logos/whitediscord.png" className="h-5 fill-white" />
                </IconButton>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </footer>
  );
}
