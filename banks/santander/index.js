var formatters = require('../../lib/formatters')
var ediHelper = require('../../lib/edi-helper')
var helper = require('./helper')

exports.options = {
  logoURL: 'data:image/jpeg;base64,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',
  codigo: '033'
}

exports.dvBarra = function (barra) {
  var resto2 = formatters.mod11(barra, 9, 1)
  return (resto2 == 0 || resto2 == 1 || resto2 == 10) ? 1 : 11 - resto2
}

exports.barcodeData = function (boleto) {
  var codigoBanco = this.options.codigo
  var numMoeda = '9'
  var fixo = '9' // Numero fixo para a posição 05-05
  var ios = '0' // IOS - somente para Seguradoras (Se 7% informar 7, limitado 9%) - demais clientes usar 0

  var fatorVencimento = formatters.fatorVencimento(boleto['data_vencimento'])

  var valor = formatters.addTrailingZeros(boleto['valor'], 10)
  var carteira = boleto['carteira']
  var codigoCedente = formatters.addTrailingZeros(boleto['codigo_cedente'], 7)

  var nossoNumero = formatters.addTrailingZeros(boleto['nosso_numero'], 12) + formatters.mod11(boleto['nosso_numero'])

  var barra = codigoBanco + numMoeda + fatorVencimento + valor + fixo + codigoCedente + nossoNumero + ios + carteira

  var dvBarra = this.dvBarra(barra)
  var lineData = barra.substring(0, 4) + dvBarra + barra.substring(4, barra.length)

  return lineData
}

exports.linhaDigitavel = function (barcodeData) {
  // Posição   Conteúdo
  // 1 a 3    Número do banco
  // 4        Código da Moeda - 9 para Real ou 8 - outras moedas
  // 5        Fixo "9'
  // 6 a 9    PSK - codigo cliente (4 primeiros digitos)
  // 10 a 12  Restante do PSK (3 digitos)
  // 13 a 19  7 primeiros digitos do Nosso Numero
  // 20 a 25  Restante do Nosso numero (8 digitos) - total 13 (incluindo digito verificador)
  // 26 a 26  IOS
  // 27 a 29  Tipo Modalidade Carteira
  // 30 a 30  Dígito verificador do código de barras
  // 31 a 34  Fator de vencimento (qtdade de dias desde 07/10/1997 até a data de vencimento)
  // 35 a 44  Valor do título

  var campos = []

  // 1. Primeiro Grupo - composto pelo código do banco, código da moéda, Valor Fixo "9"
  // e 4 primeiros digitos do PSK (codigo do cliente) e DV (modulo10) deste campo
  var campo = barcodeData.substring(0, 3) + barcodeData.substring(3, 4) + barcodeData.substring(19, 20) + barcodeData.substring(20, 24)
  campo = campo + formatters.mod10(campo)
  campo = campo.substring(0, 5) + '.' + campo.substring(5, campo.length)
  campos.push(campo)

  // 2. Segundo Grupo - composto pelas 3 últimas posiçoes do PSK e 7 primeiros dígitos do Nosso Número
  // e DV (modulo10) deste campo
  campo = barcodeData.substring(24, 34)
  campo = campo + formatters.mod10(campo)
  campo = campo.substring(0, 5) + '.' + campo.substring(5, campo.length)
  campos.push(campo)

  // 3. Terceiro Grupo - Composto por : Restante do Nosso Numero (6 digitos), IOS, Modalidade da Carteira
  // e DV (modulo10) deste campo
  campo = barcodeData.substring(34, 44)
  campo = campo + formatters.mod10(campo)
  campo = campo.substring(0, 5) + '.' + campo.substring(5, campo.length)
  campos.push(campo)

  // 4. Campo - digito verificador do codigo de barras
  campo = barcodeData.substring(4, 5)
  campos.push(campo)

  // 5. Campo composto pelo fator vencimento e valor nominal do documento, sem
  // indicacao de zeros a esquerda e sem edicao (sem ponto e virgula). Quando se
  // tratar de valor zerado, a representacao deve ser 0000000000 (dez zeros).
  campo = barcodeData.substring(5, 9) + barcodeData.substring(9, 19)
  campos.push(campo)

  return campos.join(' ')
}

exports.parseEDIFile = function (fileContent) {
  try {
    var lines = fileContent.split('\n')
    var parsedFile = {
      boletos: {}
    }

    var currentNossoNumero = null

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i]
      var registro = line.substring(7, 8)

      if (registro == '0') {
        parsedFile['cnpj'] = line.substring(17, 32)
        parsedFile['razao_social'] = line.substring(72, 102)
        parsedFile['agencia_cedente'] = line.substring(32, 36)
        parsedFile['conta_cedente'] = line.substring(37, 47)
        parsedFile['data_arquivo'] = helper.dateFromEdiDate(line.substring(143, 152))
      } else if (registro == '3') {
        var segmento = line.substring(13, 14)

        if (segmento == 'T') {
          var boleto = {}

          boleto['codigo_ocorrencia'] = line.substring(15, 17)
          boleto['vencimento'] = formatters.dateFromEdiDate(line.substring(69, 77))
          boleto['valor'] = formatters.removeTrailingZeros(line.substring(77, 92))
          boleto['tarifa'] = formatters.removeTrailingZeros(line.substring(193, 208))
          boleto['banco_recebedor'] = formatters.removeTrailingZeros(line.substring(92, 95))
          boleto['agencia_recebedora'] = formatters.removeTrailingZeros(line.substring(95, 100))

          currentNossoNumero = formatters.removeTrailingZeros(line.substring(40, 52))
          parsedFile.boletos[currentNossoNumero] = boleto
        } else if (segmento == 'U') {
          parsedFile.boletos[currentNossoNumero]['valor_pago'] = formatters.removeTrailingZeros(line.substring(77, 92))

          var paid = parsedFile.boletos[currentNossoNumero]['valor_pago'] >= parsedFile.boletos[currentNossoNumero]['valor']
          paid = paid && parsedFile.boletos[currentNossoNumero]['codigo_ocorrencia'] == '17'

          boleto = parsedFile.boletos[currentNossoNumero]

          boleto['pago'] = paid
          boleto['edi_line_number'] = i
          boleto['edi_line_checksum'] = ediHelper.calculateLineChecksum(line)
          boleto['edi_line_fingerprint'] = boleto['edi_line_number'] + ':' + boleto['edi_line_checksum']

          currentNossoNumero = null
        }
      }
    }

    return parsedFile
  } catch (e) {
    return null
  }
}
