function expressionSplit(expression) {
    let result = expression.split(/[,\.\s;)(]/).filter(e => e !== '');
    return result.join('\n');
}

console.log(
    expressionSplit(
        'let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}'
    )
);
