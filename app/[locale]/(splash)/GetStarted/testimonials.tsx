import { InfiniteMovingCards } from "@/components/InfiniteMovingCards";

import avatar1 from "@/public/testimonials/avatar1.jpg";
import avatar2 from "@/public/testimonials/avatar2.jpg";
import avatar3 from "@/public/testimonials/avatar3.jpg";
import avatar4 from "@/public/testimonials/avatar4.jpg";
import avatar5 from "@/public/testimonials/avatar5.jpg";
import avatar6 from "@/public/testimonials/avatar6.jpg";
import avatar7 from "@/public/testimonials/avatar7.jpg";
import avatar8 from "@/public/testimonials/avatar8.png";
import avatar9 from "@/public/testimonials/avatar9.jpg";
import avatar10 from "@/public/testimonials/avatar10.jpg";
import avatar11 from "@/public/testimonials/avatar11.png";

const testimonials = [
  {
    name: "Lucas Grey",
    avatarUrl: avatar1,
    handle: "@ImLucasGrey",
    verified: true,
    quote: "This is so ingenious and good!",
  },
  {
    name: "Patrick Tobler",
    avatarUrl: avatar2,
    handle: "@Padierfind",
    verified: true,
    quote: "I love this",
  },
  {
    name: "Ben Tossell",
    avatarUrl: avatar3,
    handle: "@bentossell",
    verified: true,
    quote:
      "well, an actually enjoyable way to organise my whole in and out of my business, plus highlighted a bunch of things I need to cancel",
  },
  {
    name: "Christian Alares",
    avatarUrl: avatar4,
    handle: "@c_alares",
    verified: true,
    quote: "Omg, this is so cool!",
  },
  {
    name: "Zeno Rocha",
    avatarUrl: avatar5,
    handle: "@zenorocha",
    verified: true,
    quote: "this is absolutely amazing",
  },
  {
    name: "Bailey Simrell",
    avatarUrl: avatar6,
    handle: "@baileysimrell",
    verified: true,
    quote: "Awesome man, looks amazing 🔥",
  },
  {
    name: "Darshan Gajara",
    handle: "@WeirdoWizard",
    verified: false,
    quote: "No sweat! Your smooth integration with banking data blew me away.",
    avatarUrl: avatar7,
  },
  {
    name: "Cal.com",
    avatarUrl: avatar8,
    handle: "@calcom",
    verified: true,
    quote: "We love @middayai 🖤",
  },
  {
    name: "Guillermo Rauch",
    avatarUrl: avatar9,
    handle: "@rauchg",
    verified: true,
    quote:
      "nice to see @middayai generative ui features built on @vercel AI sdk midday is becoming one of the best OSS @nextjs real-world apps",
  },
  {
    name: "Kyle @ KyTech",
    avatarUrl: avatar10,
    handle: "@KyTechInc",
    verified: true,
    quote: "so ready! 🙌",
  },
  {
    name: "Steven Tey",
    avatarUrl: avatar11,
    handle: "@steventey",
    verified: true,
    quote:
      "Just found my new favorite open-source project → http://midday.ai It's a modern layer on top of Quickbooks/Xero that lets you automate the tedious accounting aspects of your business and focus on what matters – your product. Built by the 🐐s @pontusab + @viktorhofte 👏",
  },
  {
    name: "Gokul",
    avatarUrl: avatar6,
    handle: "@KyTechInc",
    verified: true,
    quote: "🖤 Awesome work. just love it.",
  },
  {
    name: "Peer Richelsen — oss/acc",
    avatarUrl: avatar7,
    handle: "@peer_rich",
    verified: true,
    quote:
      "the best thing i couldve done as a founder is build something that helps other founders. so proud 🖤 @middayai",
  },
];

export function Testimonials() {
  return (
    <div className="relative pb-22">
      <h3 className="text-4xl mb-8 font-medium">What people say</h3>
      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
    </div>
  );
}
