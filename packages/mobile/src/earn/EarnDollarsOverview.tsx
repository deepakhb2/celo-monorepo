import colors from '@celo/react-components/styles/colors'
import fontStyles from '@celo/react-components/styles/fonts'
import * as React from 'react'
import { WithTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import componentWithAnalytics from 'src/analytics/wrapper'
import { Namespaces, withTranslation } from 'src/i18n'
import { convertDollarsToLocalAmount } from 'src/localCurrency/convert'
import { useLocalCurrencyCode, useLocalCurrencySymbol } from 'src/localCurrency/hooks'
import { getLocalCurrencyExchangeRate } from 'src/localCurrency/selectors'
import useSelector from 'src/redux/useSelector'
import { getMoneyDisplayValue } from 'src/utils/formatting'

type Props = WithTranslation

function EarnDollarsOverview({ t }: Props) {
  const localCurrencyCode = useLocalCurrencyCode()
  const localCurrencySymbol = useLocalCurrencySymbol()
  const dollarsEarned = useSelector((state) => state.earn.figureEightEarned)
  const localExchangeRate = useSelector(getLocalCurrencyExchangeRate)
  const localBalance = convertDollarsToLocalAmount(dollarsEarned, localExchangeRate)
  const localValue =
    localBalance || dollarsEarned === null
      ? getMoneyDisplayValue(localBalance || 0)
      : getMoneyDisplayValue(dollarsEarned || 0)

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>
        <Text style={fontStyles.semiBold}>{localCurrencySymbol}</Text>
        <Text style={fontStyles.semiBold}>{localValue}</Text>
        <Text style={styles.code}> {localBalance ? localCurrencyCode : ''}</Text>
      </Text>
      {!!localCurrencyCode && (
        <Text style={styles.localBalance}>
          <Text>{getMoneyDisplayValue(dollarsEarned || 0)} </Text>
          <Text>{t('global:celoDollars')}</Text>
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
    color: colors.dark,
  },
  balance: {
    fontSize: 32,
    lineHeight: 50,
    height: 36,
    color: colors.dark,
  },
  localBalance: {
    ...fontStyles.light,
    fontSize: 18,
    color: '#B0B5B9',
  },
  code: {
    fontSize: 22,
  },
})

export default componentWithAnalytics(withTranslation(Namespaces.walletFlow5)(EarnDollarsOverview))
