let arg = [];
function del(s, i, v) {
    if (s[i].includes(v)) {
        let ind = s[i].indexOf(v);
        s[i] = s[i].slice(0, ind) + s[i].slice(ind + v.length, s[i].length);
    }
    if (s[i] == '') {
        s.splice(i, 1);
    }
}
process.argv.forEach((v, i) => {
    if (i >= 2) {
        arg.push(String(v));
    }
});
if (arg.length == 0) {
    console.log('');
}
else if (arg.length == 1) {
    console.log(arg[0]);
}
else {
    let k = [], s = JSON.parse(JSON.stringify(arg)); 
    while (s.length > 1) {
        let mx = s[0], mn = s[1], c = 0, lj = 0;
        if (s.length == 2) {
            if (s[1].length > s[0].length) {
                mx = s[1];
                mn = s[0];
            }
        }
        else {
            for (let i = 0; i < s.length; i++) {
                if (s[i].length < mn.length) {
                    mn = s[i];
                }
            }
            for (let i = 0; i < s.length; i++) {
                if (s[i].length < mx.length && mn != s[i]) {
                    mx = s[i]
                }
            }
        }
        let m = mx.length, n = mn.length, A = [], res = '', pk = [];
        for (let i = 0; i < n + 1; i++) {
            A[i] = [];
            for (let j = 0; j < m + 1; j++) {
                if ((i == 0 || j == 0) || (mx[j - 1] != mn[i - 1])) {
                    A[i][j] = 0;
                }
                else {
                    A[i][j] = A[i - 1][j - 1] + 1;
                    if (c < A[i][j]) {
                        c = A[i][j];
                        lj = j - 1;
                    }
                }
            }
        }
        if (c == 0 && k.length == 0) {
            console.log('');
            break;
        }
        else if (c == 0 && k.length != 0) {
            break;
        }
        else {
            while (c > 0) {
                res = mx[lj] + res;
                lj -= 1;
                c -= 1;
            }
        }
        let ck = 0;
        for (let i = 0; i < arg.length; i++) {
            if (arg[i].includes(res)) {
                ck += 1;
            }
        }
        if (ck == arg.length) {
            k.push(res);
            break;
        }
        else {
            if (res.length > 1) {
                for (let i = 0; i < res.length; i++) {
                    for (let j = i; j < res.length; j++) {
                        let ts = ''
                        for (let z = i; z <= j; z++) {
                            ts += res[z]
                        }
                        pk.push(ts);
                    }
                }
                pk = Array.from(new Set(pk));
                pk.sort(function (a, b) { return b.length - a.length });
                if (pk.length > 0) {
                    let f = Boolean(false);
                    for (let i = 0; i < pk.length; i++) {
                        ck = 0;
                        for (let j = 0; j < arg.length; j++) {
                            if (arg[j].includes(pk[i])) {
                                ck += 1;
                            }
                        }
                        if (ck == arg.length) {
                            f = Boolean(true);
                            k.push(pk[i]);
                            for (let z = 0; z < s.length; z++) {
                                del(s, z, s[z]);
                            }
                            break;
                        }
                    }
                    if (f == false) {
                        for (let i = 0; i < s.length; i++) {
                            del(s, i, res);
                        }
                    }

                }
            }
            else {
                for (let i = 0; i < s.length; i++) {
                    del(s, i, res);
                }
            }
        }
        if (k.length == 0 || k.length == 1) {
            continue;
        }
        else {
            k = Array.from(new Set(k));
            k.sort(function (a, b) { return b.length - a.length });
        }
    }
    if (k.length != 0) {
        console.log(k[0]);
    }
}