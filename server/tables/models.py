from django.db import models


# Модели для химвеществ
class Material_group(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Prefix(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Unit(models.Model):
    name = models.CharField(max_length=80)
    def __str__(self):
        return self.name

class Material(models.Model):
    code = models.CharField(max_length=80)
    name = models.CharField(max_length=80)
    group = models.ForeignKey('Material_group', on_delete=models.CASCADE)
    prefix = models.ForeignKey('Prefix', on_delete=models.CASCADE)
    mark = models.CharField(max_length=80)
    ammount = models.FloatField(default = 0)
    reserved = models.FloatField(default = 0)
    unit = models.ForeignKey('Unit', on_delete=models.CASCADE)
    concentration = models.FloatField()
    price = models.FloatField(default = 0)
    def __str__(self):
        full_name = self.name + ('' if self.mark == '-' else (' ' + self.mark))
        return full_name
    def get_name(self):
        full_name = self.code + " " + self.name
        return full_name
    def get_full_name(self):
        full_name = self.name + ('' if self.mark == '-' else (' ' + self.mark))
        full_name = self.code + " " + full_name
        return full_name


# Модели для продукции
class Product_group(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Product_form(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Product_use(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Product_mark(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Product(models.Model):
    code = models.CharField(max_length=13)
    name = models.CharField(max_length=80)
    group = models.ForeignKey('Product_group', on_delete=models.CASCADE)
    use = models.ForeignKey('Product_use', on_delete=models.CASCADE)
    option = models.CharField(max_length=80)
    detail = models.CharField(max_length=80)
    mark = models.ForeignKey('Product_mark', on_delete=models.CASCADE)
    production = models.OneToOneField('Production', null=True, on_delete=models.CASCADE)
    def __str__(self):
        opt = ' (' + self.mark.name + ', ' + ('' if self.production is None else (self.production.container.mat.name + " " + self.production.container.group.name + ', ')) + ('' if self.production is None else (self.production.cap.group.name + ', ')) + ('0' if self.production is None else str(self.production.compAmount)) + ' кг.' + ')'
        full_name =  ('' if self.production is None or self.production.composition.form is None else self.production.composition.form.name) + ' ' + self.use.name + ' ' + ('' if self.option == 'отсутствует' else (self.option + ' ')) + ('' if self.detail == 'отсутствует' else self.detail) + opt
        return full_name
    def get_short_code(self):
        return self.code[9:]
    def get_short_name(self):
        return ('' if self.production is None or self.production.composition.form is None else self.production.composition.form.name) + ' ' + self.use.name + ' ' + ('' if self.option == 'отсутствует' else (self.option + ' ')) + ('' if self.detail == 'отсутствует' else self.detail)
    def get_name_for_table(self):
        return self.name + ' ' + self.mark.name + ' ' + ('' if self.option == 'отсутствует' else (self.option + ' '))

#Модели для рецептов

class Composition_group(models.Model):
    name = models.CharField(max_length=80)
    def __str__(self):
        return self.name

class Composition(models.Model):
    code = models.CharField(max_length=80)
    name = models.CharField(max_length=80)
    sgr = models.CharField(max_length=80)
    sh_life = models.IntegerField(default = 24, blank=True, null = True)
    date = models.DateField(null = True, blank=True)
    comp_package = models.CharField(max_length=80, null = True, blank=True)
    standard = models.CharField(max_length=80, null = True, blank=True)
    certificate = models.CharField(max_length=80, null = True, blank=True)
    declaration = models.CharField(max_length=80, null = True, blank=True)
    cur_batch = models.FloatField(default = 1)
    group = models.ForeignKey('Composition_group', on_delete=models.CASCADE)
    form = models.ForeignKey('Product_form', null=True, on_delete=models.CASCADE)
    isFinal = models.BooleanField(default = True)
    def __str__(self):
        return self.name
    def get_name(self):
        return self.code + " " + self.name
    def get_package(self):
        res = self.comp_package + " по "
        prods = Production.objects.filter(composition = self)
        amms = set()
        for p in prods:
            if p.compAmount != 0:
                amms.add(str(int(p.compAmount * 1000)))
        length = len(amms)
        for i in range(length):
            res = res + amms.pop()
            if len(amms) != 0:
                res = res + " или "
            else:
                res = res + " г"
        return res
    def get_package_pass(self):
        res = self.comp_package + " по "
        prods = Production.objects.filter(composition = self)
        amms = set()
        for p in prods:
            if p.compAmount != 0 and p.compAmount != 5:
                amms.add(str(int(p.compAmount * 1000)))
        length = len(amms)
        for i in range(length):
            res = res + amms.pop()
            if len(amms) != 0:
                res = res + " или "
            else:
                res = res + " г"
        return res


class Components(models.Model):
    comp = models.ForeignKey('Composition', on_delete=models.CASCADE)
    mat = models.ForeignKey('Material', on_delete=models.CASCADE)
    min = models.FloatField()
    max = models.FloatField()

#Модели для тары

class Container_group(models.Model):
    name = models.CharField(max_length=80)
    def __str__(self):
        return self.name

class Colour(models.Model):
    name = models.CharField(max_length=80)
    def __str__(self):
        return self.name

class Container_mat(models.Model):
    name = models.CharField(max_length=80)
    def __str__(self):
        return self.name

class Container(models.Model):
    code = models.CharField(max_length=80)
    group = models.ForeignKey('Container_group', on_delete=models.CASCADE)
    form = models.CharField(max_length=80)
    colour = models.ForeignKey('Colour', on_delete=models.CASCADE)
    mat = models.ForeignKey('Container_mat', on_delete=models.CASCADE)
    def __str__(self):
        return 'Нет' if self.code == 'Т000' else self.group.name + " " + self.form + " " + self.mat.name + " " + self.colour.name

#Модели для укупорки

class Cap_group(models.Model):
    name = models.CharField(max_length=80)
    def __str__(self):
        return self.name

class Cap(models.Model):
    code = models.CharField(max_length=80)
    group = models.ForeignKey('Cap_group', on_delete=models.CASCADE)
    form = models.CharField(max_length=80)
    colour = models.ForeignKey('Colour', on_delete=models.CASCADE)
    mat = models.ForeignKey('Container_mat', on_delete=models.CASCADE)
    def __str__(self):
        return 'Нет' if self.code == 'У000' else self.group.name + " " + self.form + " " + self.mat.name + " " + self.colour.name

#Модели для упаковки

class Box_group(models.Model):
    name = models.CharField(max_length=80)
    def __str__(self):
        return self.name

class Boxing_mat(models.Model):
    name = models.CharField(max_length=80)
    def __str__(self):
        return self.name

class Boxing(models.Model):
    code = models.CharField(max_length=80)
    group = models.ForeignKey('Box_group', null=True, on_delete=models.CASCADE)
    form = models.CharField(max_length=80)
    colour = models.ForeignKey('Colour', null=True, on_delete=models.CASCADE)
    mat = models.ForeignKey('Boxing_mat', null=True, on_delete=models.CASCADE)
    def __str__(self):
        return 'Нет' if self.code == 'Я000' else self.group.name + " " + self.form + " " + self.mat.name + " " + self.colour.name

#Модели для этикетки

class Sticker_part(models.Model):
    name = models.CharField(max_length=80)
    def __str__(self):
        return self.name

class Sticker(models.Model):
    code = models.CharField(max_length=80)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    part = models.ForeignKey('Sticker_part', on_delete=models.CASCADE)
    def __str__(self):
        return 'Нет' if self.code == '0000Э' else "Этикетка " + self.product.code + " " + self.part.name + " / " + self.product.name + ' ' + self.product.mark.name + ' ' + ('' if self.product.option == 'отсутствует' else self.product.option)


#Модели для производства

class Production(models.Model):
    composition = models.ForeignKey('Composition', on_delete=models.CASCADE)
    container = models.ForeignKey('Container', on_delete=models.CASCADE)
    cap = models.ForeignKey('Cap', on_delete=models.CASCADE)
    sticker = models.ForeignKey('Sticker', on_delete=models.CASCADE)
    boxing = models.ForeignKey('Boxing', on_delete=models.CASCADE)
    compAmount = models.FloatField(default = 0)
    compUnit = models.ForeignKey('Unit', null = True, on_delete=models.CASCADE)
    contAmount = models.FloatField(default = 0)
    contUnit = models.ForeignKey('Unit', null = True, related_name="cont_unit", on_delete=models.CASCADE)
    capAmount = models.FloatField(default = 0)
    capUnit = models.ForeignKey('Unit', null = True, related_name="cap_unit", on_delete=models.CASCADE)
    stickerAmount = models.FloatField(default = 0)
    stickerUnit = models.ForeignKey('Unit', null = True, related_name="sticker_unit", on_delete=models.CASCADE)
    boxingAmount = models.FloatField(default = 0)
    boxingUnit = models.ForeignKey('Unit', null = True, related_name="boxing_unit", on_delete=models.CASCADE)
    def __str__(self):
        return self.product.name
    def get_boxing_amm(self):
        if self.boxingAmount == 0:
            res = 0
        else:
            res = int(1 / self.boxingAmount)
        return res

#Модели для хранилищ

class Reactor(models.Model):
    code = models.CharField(max_length=80)
    name = models.CharField(max_length=80)
    product = models.CharField(max_length=250)
    location = models.CharField(max_length=80)
    #capacity = models.FloatField()
    min = models.FloatField()
    max = models.FloatField()
    ready = models.BooleanField()
    def __str__(self):
        return self.code + ' ' + self.name
    def get_check(self):
        return 'checked' if self.ready else ''

class Tank(models.Model):
    code = models.CharField(max_length=80)
    name = models.CharField(max_length=80)
    capacity = models.FloatField()
    ready = models.BooleanField()
    def __str__(self):
        return self.code + ' ' + self.name
    def get_check(self):
        return 'checked' if self.ready else ''

#Модели для составов

class Formula(models.Model):
    code = models.CharField(max_length=80)
    name = models.CharField(max_length=80, null=True)
    composition = models.ForeignKey('Composition', on_delete=models.CASCADE)
    cur_batch = models.FloatField(default = 1)
    def __str__(self):
        return self.composition.name + (' ' if self.name is None else (' ' + self.name))
    def get_name(self):
        return self.composition.name + (' ' if self.name is None else (' ' + self.name))
    def get_name2(self):
        return self.code + ' ' + self.composition.name + (' ' if self.name is None else (' ' + self.name))
    def get_short_name(self):
        return '' if self.name is None else self.name


class Formula_component(models.Model):
    formula = models.ForeignKey('Formula', on_delete=models.CASCADE)
    mat = models.ForeignKey('Material', on_delete=models.CASCADE)
    ammount = models.FloatField()
    def __str__(self):
        return self.mat.name

#Составной компонент
class Compl_comp(models.Model):
    formula = models.ForeignKey('Formula', blank=True, default = None, null=True, on_delete=models.CASCADE)
    code = models.CharField(max_length=80)
    name = models.CharField(max_length=80)
    ammount = models.FloatField()
    reserved = models.FloatField(default = 0)
    store_amount = models.FloatField(default = 0)
    form = models.ForeignKey('Product_form', blank=True, null=True, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    def get_name(self):
        return self.code + ' ' + self.name

#Составляющая составного компонента
class Compl_comp_comp(models.Model):
    compl = models.ForeignKey('Compl_comp', on_delete=models.CASCADE)
    mat = models.ForeignKey('Material', on_delete=models.CASCADE)
    ammount = models.FloatField()
    def __str__(self):
        return self.mat.name

#Характеристики


class Characteristic_type(models.Model):
    name = models.CharField(max_length=80)
    def __str__(self):
        return self.name

class Characteristic(models.Model):
    name = models.CharField(max_length=80)
    char_type = models.ForeignKey('Characteristic_type', default=1, on_delete=models.CASCADE)
    is_general = models.BooleanField(default = True)
    group = models.ForeignKey('Char_group', on_delete=models.CASCADE)
    def __str__(self):
        return ('' if self.group.name == 'отсутствует' else self.group.name + ': ') + self.name
    def get_group(self):
        return '' if self.group.name == 'отсутствует' else self.group.name + ': '

class Char_group(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Set_var(models.Model):
    name = models.CharField(max_length=80)
    def __str__(self):
        return self.name

class Characteristic_set_var(models.Model):
    char_set = models.ForeignKey('Characteristic', on_delete=models.CASCADE)
    char_var = models.ForeignKey('Set_var', on_delete=models.CASCADE)
    def __str__(self):
        return self.char_var.name

class Characteristic_range(Characteristic):
    inf = models.FloatField()
    sup = models.FloatField()
    def __str__(self):
        return self.name

class Characteristic_number(Characteristic):
    inf = models.FloatField()
    sup = models.FloatField()
    def __str__(self):
        return self.name


class Composition_char(models.Model):
    comp = models.ForeignKey('Composition', on_delete=models.CASCADE)
    characteristic = models.ForeignKey('Characteristic', on_delete=models.CASCADE)
    def __str__(self):
        return self.characteristic.name
    def get_name(self):
        return self.comp.name + ' ' + self.characteristic.name

class Comp_char_range(Composition_char):
    inf = models.FloatField()
    sup = models.FloatField()
    def __str__(self):
        return self.get_name()

class Comp_char_number(Composition_char):
    number = models.FloatField()
    def __str__(self):
        return self.get_name()

class Comp_char_var(models.Model):
    comp_char = models.ForeignKey('Composition_char', on_delete=models.CASCADE)
    char_var = models.ForeignKey('Set_var', on_delete=models.CASCADE)
    def __str__(self):
        return self.comp_char.get_name() + ' ' + self.char_var.name

#Характеристики реактивов
class Material_char(models.Model):
    mat = models.ForeignKey('Material', on_delete=models.CASCADE)
    characteristic = models.ForeignKey('Characteristic', on_delete=models.CASCADE)
    def __str__(self):
        return self.characteristic.name
    def get_name(self):
        return self.mat.name + ' ' + self.characteristic.name

class Mat_char_number(Material_char):
    number = models.FloatField()
    def __str__(self):
        return self.get_name()

class Mat_char_var(models.Model):
    mat_char = models.ForeignKey('Material_char', on_delete=models.CASCADE)
    char_var = models.ForeignKey('Set_var', on_delete=models.CASCADE)
    def __str__(self):
        return self.mat_char.get_name() + ' ' + self.char_var.name

# Модели для видовых характеристик

class Comp_prop_number(Composition_char):
    number = models.FloatField()
    def __str__(self):
        return self.get_name()

class Comp_prop_var(models.Model):
    comp_prop = models.ForeignKey('Composition_char', on_delete=models.CASCADE)
    char_var = models.ForeignKey('Set_var', on_delete=models.CASCADE)
    def __str__(self):
        return self.comp_char.get_name() + ' ' + self.char_var.name
