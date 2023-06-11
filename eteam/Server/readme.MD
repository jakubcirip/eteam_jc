# LANG

`yarn build:lang`

```
"Ahoj {{myVal}}"
__("key", { myVal: 5 });
```

```
"success": "Uspesne si zakupil {toAdd} {toAdd, plural, one{token} few{tokeny} other{tokenov}}. Na ucte mas teraz {newAmount} {newAmount, plural, one{token} few{tokeny} other{tokenov}}."

__('CompanyService.purchaseTokens.success', {
  toAdd: pack.getAmount(),
  newAmount,
}),

```

```
console.log(
      req.$localize(
        ':testicek@@so9gXMx:Ahoj {{name}} a rovno si vyskusam ci si {gender, select, male{muz} female{zena} other{divny}} a ci mas {{apples}} {apples, plural, =1{jablko} =2{jablka} =3{jablka} =4{jablka} other{jablk}}',
        { name: 'Matej', gender: 'male', apples: 3 }
      )
    );
```
