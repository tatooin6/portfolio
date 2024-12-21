import Image, { ImageProps } from "next/image";
import React from "react";
import Link, { LinkProps } from "next/link";
import { highlight } from "sugar-high";
import { MDXRemote } from "next-mdx-remote/rsc";

type WithChildren<P = {}> = P & { children: string };
type AnchorAndLink = React.HTMLProps<HTMLAnchorElement> & LinkProps;
type TableProps = {
  data: {
    headers: string[];
    rows: string[][];
  };
};

const slugify = (str: string) => {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

const Table = ({ data }: TableProps) => {
  const headers = data.headers.map((header, index) => (
    <th key={index}> {header} </th>
  ));

  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  );
};

const CustomLink = (props: AnchorAndLink) => {
  const { href } = props;

  if (href?.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const RoundedImage = (props: ImageProps) => {
  return <Image {...props} alt={props.alt} className="rounded-lg" />;
};

const Code = ({
  children,
  ...props
}: WithChildren<React.HTMLProps<HTMLElement>>) => {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
};

const createHeading = (level: Number) => {
  const Heading = ({ children }: WithChildren) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
};

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

const CustomMDX = (props: any) => {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
};

export default CustomMDX;
