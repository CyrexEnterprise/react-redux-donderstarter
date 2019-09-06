import { History } from 'history'
import { WithLocalizationProps } from 'components/Localization/types'

export interface HomePageProps extends WithLocalizationProps {
  history: History<any>,
}
