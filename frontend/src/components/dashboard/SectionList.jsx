import SectionRow from './SectionRow';

const FLAGS = {
  FWC:'🏆',MEX:'🇲🇽',RSA:'🇿🇦',KOR:'🇰🇷',CZE:'🇨🇿',CAN:'🇨🇦',BIH:'🇧🇦',QAT:'🇶🇦',
  SUI:'🇨🇭',BRA:'🇧🇷',MAR:'🇲🇦',HAI:'🇭🇹',SCO:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',USA:'🇺🇸',PAR:'🇵🇾',AUS:'🇦🇺',
  TUR:'🇹🇷',GER:'🇩🇪',CUW:'🇨🇼',CIV:'🇨🇮',ECU:'🇪🇨',NED:'🇳🇱',JPN:'🇯🇵',SWE:'🇸🇪',
  TUN:'🇹🇳',BEL:'🇧🇪',EGY:'🇪🇬',IRN:'🇮🇷',NZL:'🇳🇿',ESP:'🇪🇸',CPV:'🇨🇻',KSA:'🇸🇦',
  URU:'🇺🇾',FRA:'🇫🇷',SEN:'🇸🇳',IRQ:'🇮🇶',NOR:'🇳🇴',ARG:'🇦🇷',ALG:'🇩🇿',AUT:'🇦🇹',
  JOR:'🇯🇴',POR:'🇵🇹',COD:'🇨🇩',UZB:'🇺🇿',COL:'🇨🇴',ENG:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',CRO:'🇭🇷',GHA:'🇬🇭',
  PAN:'🇵🇦',CC:'🥤',
};

export default function SectionList({ sections }) {
  if (!sections?.length) return null;
  return (
    <div className="flex flex-col gap-2">
      {sections.map(s => (
        <SectionRow key={s.id} section={{ ...s, flag: FLAGS[s.id] }} />
      ))}
    </div>
  );
}
