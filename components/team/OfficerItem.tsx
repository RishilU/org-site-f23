import { useState } from 'react';
import { Officer } from "../../lib/types";
import { Email, GitHub, LinkedIn, Language, FormatQuote } from '@mui/icons-material';
import Link from 'next/link';

interface OfficerItemProps {
  officer: Officer;
}

function officerImage(officer: Officer) {
  if (officer.image) {
    return (
      <div className="flex justify-center h-52 w-full">
        <img src={officer.image} className="rounded-full p-4 h-52 w-52 object-cover"/>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center h-52 w-full">
        <img src="/default_photo.svg" className="rounded-full p-4 object-cover" />
      </div>
    );
  }
}

function emailLink(officer: Officer) {
  if (officer.email) {
    return (
      <div className="px-2">
        <button className="transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <a href={'mailto: ' + officer.email}>
            <Email color="primary" />
          </a>
        </button>
      </div>
    );
  }
}

function githubLink(officer: Officer) {
  if (officer.github) {
    let githubUsername = officer.github;

    if (githubUsername.includes('github.com/')) {
      const parts = githubUsername.split('github.com/');
      githubUsername = parts[parts.length - 1].replace(/^\//, '').replace(/\/.*$/, '').replace(/[^\w-]/g, '');
    }

    const githubUrl = `https://github.com/${githubUsername}`;

    return (
      <div className="px-2">
        <button className="transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <a target="_blank" href={githubUrl} rel="noreferrer">
            <GitHub color="primary" fontSize="small" />
          </a>
        </button>
      </div>
    );
  }
}

function linkedInLink(officer: Officer) {
  if (officer.linkedInUrl) {
    let linkedInUsername = officer.linkedInUrl;

    if (linkedInUsername.includes('linkedin.com/in/')) {
      const parts = linkedInUsername.split('linkedin.com/in/');
      linkedInUsername = parts[parts.length - 1].replace(/^\//, '').replace(/\/.*$/, '').replace(/[^\w-]/g, '');
    }

    const linkedInUrl = `https://www.linkedin.com/in/${linkedInUsername}`;

    return (
      <div className="px-2">
        <button className="transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <a target="_blank" href={linkedInUrl} rel="noreferrer">
            <LinkedIn color="primary" />
          </a>
        </button>
      </div>
    );
  }
}

function personalLink(officer: Officer) {
  if (officer.personalWeb) {
    let personalUrl = officer.personalWeb;

    if (personalUrl.includes('https://')) {
      const parts = personalUrl.split('https://');
      personalUrl = parts[parts.length - 1].replace(/^\//, '').replace(/[^.\w-]/g, '');
    }

    const finalUrl = `https://${personalUrl}`;

    return (
      <div className="px-2">
        <button className="transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          <a target="_blank" href={finalUrl} rel="noreferrer">
            <Language color="primary" />
          </a>
        </button>
      </div>
    );
  }
}

function personalQuote(officer: Officer) {
  if (officer.quote) {
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
      setIsHovering(true);
    };
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    return (
      <div className="px-2">
        <button 
          className="transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
        >
          <FormatQuote color="primary" />
        </button>
        {isHovering && (
          <div className="absolute z-10 bg-ais-light-gray shadow-xl p-4 rounded-xl">{officer.quote}</div>
        )}
      </div>
    );
  }
}

export default function OfficerItem({ officer }: OfficerItemProps) {
  const { name, title } = officer;

  const officerImg = officerImage(officer);
  const officerEmail = emailLink(officer);
  const officerGitHub = githubLink(officer);
  const officerLinkedIn = linkedInLink(officer);
  const officerPersonal = personalLink(officer);
  const officerQuote = personalQuote(officer);

  return (
    <div className="h-80 w-64 transition duration-400 hover:shadow-lg hover:bg-ais-blue-gray rounded-xl">
      {officerImg}
      <div className="text-2xl font-bold text-center">{name}</div>
      <div className="text-lg text-center font-light py-2">{title}</div>
      <div className="flex justify-center pt-1">
        {officerEmail}
        {officerGitHub}
        {officerLinkedIn}
        {officerPersonal}
        {officerQuote}
      </div>
    </div>
  );
}
