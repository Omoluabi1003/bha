# BHA school-fee payment boundary

The fee ledger stores invoices, balances and provider-verified payment records. The browser must never set a payment to `successful` or increase `amount_paid` by itself.

A payment gateway integration should:
1. Create a provider checkout transaction for an authenticated parent/student and a valid BHA invoice.
2. Redirect/open the provider's secure hosted checkout.
3. Receive a signed server-to-server webhook.
4. Verify the signature and provider reference on the server.
5. Record the successful payment exactly once and update the invoice balance transactionally.
6. Generate/display a receipt from the verified ledger record.

The payment provider is intentionally not hardcoded until BHA selects the Nigerian gateway/account that will receive school fees.
