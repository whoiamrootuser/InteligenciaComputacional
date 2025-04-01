package org.whoiamrootuser.domain;

public class ContaCoPremium extends ContaCo {
    final private double cashBackPercentual;
    public ContaCoPremium(String titular, double saldo, double limiteChequeEspecial, double cashBackPercentage) {
        super(titular, saldo, limiteChequeEspecial);
        this.cashBackPercentual = cashBackPercentage;
    }

    @Override
    public boolean sacar(double valor){
        saldo += valor * (cashBackPercentual/100);
        return super.sacar(valor);
    }

    public String exibeBeneficioPremium() {
        String formattedPercentual = String.format("%.2f%%", cashBackPercentual);
        String outputMessage = "Conta Corrente Premium com cashback de " + formattedPercentual + " a cada saque." ;
        System.out.println(outputMessage);
        return outputMessage;
    }
}
