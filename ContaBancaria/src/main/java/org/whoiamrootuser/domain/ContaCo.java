package org.whoiamrootuser.domain;

import java.text.NumberFormat;
import java.util.Locale;

public class ContaCo extends ContaBancaria {
    protected double limiteChequeEspecial;
    public ContaCo(String titular, double saldo, double limiteChequeEspecial) {
        super(titular, saldo);
        this.limiteChequeEspecial = limiteChequeEspecial;
    }

    @Override
    public boolean sacar(double valor) {
        double saldoTotal = saldo + limiteChequeEspecial;
        if (saldoTotal >= valor) {
            saldo -= valor;
            return true;
            }
        return false;
      }

    public String exibeLimiteChequeEspecial() {
       NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
       String formattedLimiteChequeEspecial = currencyFormatter.format(limiteChequeEspecial);
       String outputMessage = "Limite de Cheque Especial: " + formattedLimiteChequeEspecial;
       System.out.println(outputMessage);
       return outputMessage;
    }
}
