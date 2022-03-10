import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ResultSearch from '../Components/ResultSearch';

const dataFake = [
  {
    definitions: [
      'The whole quantity, extent, duration, amount, quality, or degree of; the whole; the whole number of; any whatever; every; as, all the wheat; all the land; all the year; all the strength; all happiness; all abundance; loss of all power; beyond all doubt; you will see us all (or all of us). Prove all things: hold fast that which is good. 1 Thess. v. 21.',
      'Any. [Obs.] "Without all remedy." Shak.',
      'Only; alone; nothing but. I was born to speak all mirth and no matter. Shak. All the whole, the whole (emphatically). [Obs.] "All the whole army." Shak.',
    ],
    pos: 'a.',
    word: 'ALL',
  },
  {
    definitions: [
      'Wholly; completely; altogether; entirely; quite; very; as, all bedewed; my friend is all for amusement. "And cheeks all pale." Byron.',
      'Even; just. (Often a mere intensive adjunct.) [Obs. or Poet.] All as his straying flock he fed. Spenser. A damsel lay deploring All on a rock reclined. Gay. All to, or All-to. In such phrases as "all to rent," "all to break," "all-to frozen," etc., which are of frequent occurrence in our old authors, the all and the to have commonly been regarded as forming a compound adverb, equivalent in meaning to entirely, completely, altogether. But the sense of entireness lies wholly in the word all (as it does in "all forlorn," and similar expressions), and the to properly belongs to the following word, being a kind of intensive prefix (orig. meaning asunder and answering to the LG. ter-, HG. zer- ). It is frequently to be met with in old books, used without the all. Thus Wyclif says, "The vail of the temple was to rent:" and of Judas, "He was hanged and to-burst the middle:" i. e., burst in two, or asunder.  -- All along. See under Along.  -- All and some, individually and collectively, one and all. [Obs.] "Displeased all and some." Fairfax.  -- All but. (a) Scarcely; not even. [Obs.] Shak. (b) Almost; nearly. "The fine arts were all but proscribed." Macaulay.  -- All hollow, entirely, completely; as, to beat any one all hollow. [Low] -- All one, the same thing in effect; that is, wholly the same thing.  -- All over, over the whole extent; thoroughly; wholly; as, she is her mother all over. [Colloq.] -- All the better, wholly the better; that is, better by the whole difference.  -- All the same, nevertheless. "There they [certain phenomena] remain rooted all the same, whether we recognize them or not." J. C. Shairp. "But Rugby is a very nice place all the same." T. Arnold.  -- See also under All, n.',
    ],
    pos: 'adv.',
    word: 'ALL',
  },
  {
    definitions: [
      'Although; albeit. [Obs.] All they were wondrous loth. Spenser.',
    ],
    pos: 'conj.',
    word: 'ALL',
  },
  {
    definitions: [
      'The whole number, quantity, or amount; the entire thing; everything included or concerned; the aggregate; the whole; totality; everything or every person; as, our all is at stake. Death, as the Psalmist saith, is certain to all. Shak. All that thou seest is mine. Gen. xxxi. 43.',
    ],
    pos: 'n.',
    word: 'ALL',
  },
];

describe('result search', () => {
  test('renders result search with Fake Data -> test the Part Of Speech length (4)', () => {
    const { container } = render(<ResultSearch data={dataFake} />);
    const POS = container.querySelectorAll('.item');

    expect(container).toBeInTheDocument();
    expect(POS.length).toBe(4);
    expect(POS).toHaveLength(dataFake.length);
  });

  test('renders result search with Fake Data -> test the first definition have 3 children', () => {
    const { container } = render(<ResultSearch data={dataFake} />);
    const firstDefinitions = container.querySelector('.item-definitions');

    expect(firstDefinitions).toBeInTheDocument();
    expect(firstDefinitions.children.length).toBe(3);
    expect(firstDefinitions.children.length).toBe(
      dataFake[0].definitions.length
    );
  });

  test('renders result search with Fake Data -> test the first POS (a.)', () => {
    const { container } = render(<ResultSearch data={dataFake} />);
    const firstDefinitions = container.querySelector('.item-pos');

    expect(firstDefinitions).toBeInTheDocument();
    expect(firstDefinitions).toHaveTextContent(dataFake[0].pos);
  });
});
