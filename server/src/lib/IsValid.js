export class IsValid {
    static fields(data, requiredSchema, optionalSchema = {}) {
        const errors = {};
        const possibleKeys = Object.keys(requiredSchema).concat(Object.keys(optionalSchema));

        for (const key in data) {
            if (!possibleKeys.includes(key)) {
                return [true, 'Ka tu čia dirbi?... Pateikei raktą, kuris nėra nei tarp privalomų, nei tarp papildomų galimų sąrašo... 👀👀👀'];
            }
        }

        for (const key in requiredSchema) {
            const funcName = requiredSchema[key];
            const func = IsValid[funcName];
            const value = data[key];
            const [err, msg] = func(value);

            if (err) {
                errors[key] = msg;
            }
        }

        for (const key in optionalSchema) {
            const funcName = optionalSchema[key];
            const func = IsValid[funcName];
            const value = data[key];

            if (!value) {
                continue;
            }

            const [err, msg] = func(value);

            if (err) {
                errors[key] = msg;
            }
        }

        return [Object.keys(errors).length > 0, errors];
    }

    static username(text) {
        const minSize = 3;
        const maxSize = 20;
        const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        if (typeof text !== 'string') {
            return [true, 'Slapyvardis turi būti tekstas'];
        }

        if (text.length < minSize) {
            return [true, `Slapyvardis turi būti ne mažiau ${minSize} simbolių`];
        }

        if (text.length > maxSize) {
            return [true, `Slapyvardis turi būti ne daugiau ${maxSize} simbolių`];
        }

        if (text.includes(' ')) {
            return [true, 'Slapyvardis negali tureti tarpu'];
        }

        const foundIllegalSymbols = [];

        for (const s of text) {
            if (!allowedSymbols.includes(s) && !foundIllegalSymbols.includes(s)) {
                foundIllegalSymbols.push(s);
            }
        }

        if (foundIllegalSymbols.length) {
            return [true, `Slapyvardyje panaudotas neleistinas simbolis: ${foundIllegalSymbols.join(', ')}`];
        }

        return [false, ''];
    }

    static password(text) {
        const minSize = 12;
        const maxSize = 100;

        if (typeof text !== 'string') {
            return [true, 'Slaptažodis turi būti tekstas'];
        }

        if (text.length < minSize) {
            return [true, `Slaptažodis turi turėti ne mažiau ${minSize} simbolių`];
        }

        if (text.length > maxSize) {
            return [true, `Slaptazodis turi tureti ne daugiau ${maxSize} simbolių`];
        }

        return [false, ''];
    }

    static age(number) {
        const min = 18;
        const max = 130;

        if (typeof number !== 'number' || !Number.isInteger(number) || number < 0) {
            return [true, 'Amžius turi būti teigiamas sveikasis skaičius'];
        }

        if (number < min) {
            return [true, `Amžius turi turėtu ne mažiau nei ${min} metų`];
        }

        if (number > max) {
            return [true, `Amžius turi turėti ne daugiau nei ${max} metų`];
        }

        return [false, ''];
    }

    static email(text) {
        const minSimbol = 6;
        const maxSimbol = 50;

        if (typeof text !== 'string') {
            return [true, 'El. paštas turi būti teksto tipo.'];
        }

        if (text.length < 6) {
            return [true, `El. paštas negali buti trumpesnis nei ${minSimbol} simboliai.`];
        }

        if (text.length > 50) {
            return [true, `El. paštas negali būti ilgesnis nei ${maxSimbol} simbolių.`];
        }

        if (!text.includes('@')) {
            return [true, 'El. paštas privalo turėti simbolį "@".'];
        }

        return [false, ''];
    }

    static nonEmptyString(text) {
        if (typeof text !== 'string') {
            return [true, 'Turi būti tekstas'];
        }

        if (text.length === 0) {
            return [true, 'Tekstas turi būti ne tuščias'];
        }

        return [false, ''];
    }

    static tos(text) {
        if (typeof text !== 'string') {
            return [true, 'Sutikimas su taisyklėmis turi būti teksto tipo.'];
        }

        if (text !== 'agree') {
            return [true, 'Sutikimas turi būti naudojant žodį "agree".'];
        }

        return [false, ''];
    }

    static numberInteger(n) {
        if (!Number.isInteger(n)) {
            return [true, 'Turi būti sveikasis skaičius'];
        }

        if (n < 0) {
            return [true, 'Turi būti teigiamas sveikasis skaičius'];
        }

        return [false, ''];
    }

    static numberFloat(n) {
        if (!isFinite(n)) {
            return [true, 'Turi būti skaičius'];
        }

        if (n < 0) {
            return [true, 'Turi būti teigiamas skaičius'];
        }

        return [false, ''];
    }

    static url(text) {
        if (typeof text !== 'string') {
            return [true, 'Turi būti tekstas'];
        }

        text = text.trim();

        if (text.length === 0) {
            return [true, 'Nuoroda turi būti ne tuščia'];
        }

        if (text.includes(' ')) {
            return [true, 'Nuoroda negali turėti tarpo simbolio'];
        }

        const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!';
        const errors = [];

        for (const s of text) {
            if (!allowedSymbols.includes(s) && !errors.includes(s)) {
                errors.push(s);
            }
        }

        if (errors.length) {
            return [true, `Nuoroda negali turėti šių simbolių: ${errors.join(', ')}`];
        }

        return [false, ''];
    }
}