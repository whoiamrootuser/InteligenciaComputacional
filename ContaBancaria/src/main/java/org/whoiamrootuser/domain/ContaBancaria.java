package org.whoiamrootuser.domain;

import java.text.NumberFormat;
import java.util.Locale;

public class ContaBancaria {
    protected String titular;
    protected double saldo;
    public ContaBancaria( String titular, double saldo) {
        this.titular = titular;
        this.saldo = saldo;
    }

    public void depositar(double valor) {
        saldo += valor;
    }
    public boolean sacar(double valor) {
        if (saldo <= valor) {
            return false;
        }
        saldo -= valor;
        return true;
    }

    public String exibeSaldo() {
        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
        String formattedSaldo = currencyFormatter.format(saldo);
        String outputMessage = "Saldo da conta de " + titular + ": " + formattedSaldo;
        System.out.println(outputMessage);
        return String.format("%.2f", saldo);
    }
}
