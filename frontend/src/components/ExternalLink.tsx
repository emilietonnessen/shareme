import { FiExternalLink } from 'react-icons/fi';

interface ExternalLinkProps {
  href: string;
  title: string;
}

const ExternalLink = ({ href, title }: ExternalLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-14 h-14 flex justify-center items-center hover:bg-gray-200 text-salmon rounded-full   text-dark text-xl bg-opacity-80 hover:bg-opacity-100"
    >
      <FiExternalLink />
      <span className="sr-only">Open external link to {title}</span>
    </a>
  );
};

export default ExternalLink;
