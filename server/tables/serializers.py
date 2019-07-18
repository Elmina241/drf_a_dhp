from rest_framework import serializers
from .models import *


class MaterialGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material_group
        fields = ('pk','name')

class PrefixSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prefix
        fields = ('pk','name')

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = ('pk','name')

class MaterialSerializer(serializers.ModelSerializer):
    group = MaterialGroupSerializer(read_only=True)
    prefix = PrefixSerializer(read_only=True)
    unit = UnitSerializer(read_only=True)
    group_id = serializers.IntegerField(write_only=True)
    prefix_id = serializers.IntegerField(write_only=True)
    unit_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Material
        fields = ('pk','name', 'code', 'group', 'prefix', 'mark', 'unit', 'concentration', 'group_id', 'prefix_id', 'unit_id')
        depth = 1


# Модели для продукции
class ProductGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_group
        fields = ('pk','name')

class ProductFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_form
        fields = ('pk','name')

class ProductUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_use
        fields = ('pk','name')

class ProductMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_mark
        fields = ('pk','name')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('pk','name', 'code', 'group', 'use', 'option', 'detail', 'mark', 'production')

#Модели для рецептов

class CompositionGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Composition_group
        fields = ('pk','name')

class CompositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Composition
        fields = ('pk','name', 'code', 'sgr', 'sh_life',
                  'date', 'package', 'standard', 'certificate',
                  'declaration', 'cur_batch', 'group', 'form', 'isFinal')


class ComponentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Components
        fields = ('pk','comp', 'mat', 'min', 'max')

#Модели для тары

class ContainerGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Container_group
        fields = ('pk','name')

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colour
        fields = ('pk','name')

class ContainerMatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Container_mat
        fields = ('pk','name')

class ContainerSerializer(serializers.ModelSerializer):
    group = ContainerGroupSerializer(read_only=True)
    colour = ColorSerializer(read_only=True)
    mat = ContainerMatSerializer(read_only=True)
    group_id = serializers.IntegerField(write_only=True)
    colour_id = serializers.IntegerField(write_only=True)
    mat_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Container
        fields = ('pk','code', 'group', 'form', 'colour', 'mat', 'colour_id', 'mat_id', 'group_id')
        depth = 1

#Модели для укупорки

class CapGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cap_group
        fields = ('pk','name')

class CapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cap
        fields = ('pk','code', 'group', 'form', 'colour', 'mat')

#Модели для упаковки

class BoxGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Box_group
        fields = ('pk','name')

class BoxingMatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boxing_mat
        fields = ('pk','name')

class BoxingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boxing
        fields = ('pk','code', 'group', 'form', 'colour', 'mat')

#Модели для этикетки

class StickerPartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sticker_part
        fields = ('pk','name')

class StickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sticker
        fields = ('pk','code', 'product', 'part')

#Модели для производства

class ProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Production
        fields = ('pk','composition', 'container', 'cap', 'sticker', 'boxing',
                  'compAmount', 'compUnit', 'contAmount', 'contUnit', 'capAmount', 'capUnit', 'stickerAmount',
                  'stickerUnit', 'boxingAmount', 'boxingUnit')

#Модели для хранилищ

class ReactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reactor
        fields = ('pk','name', 'code', 'product', 'location', 'min', 'max', 'ready')

class TankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tank
        fields = ('pk','name', 'code', 'capacity', 'ready')

#Модели для составов

class FormulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formula
        fields = ('pk','name', 'code', 'composition', 'cur_batch')


class FormulaComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formula_component
        fields = ('pk','formula', 'mat', 'ammount')

#Составной компонент
class ComplCompSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compl_comp
        fields = ('pk','name', 'code', 'formula', 'ammount', 'store_amount', 'form')

#Составляющая составного компонента
class ComplCompCompSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compl_comp_comp
        fields = ('pk','compl', 'mat', 'ammount')

#Характеристики


class CharacteristicTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristic_type
        fields = ('pk','name')

class CharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristic
        fields = ('pk','name', 'char_type', 'is_general', 'group')

class CharGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Char_group
        fields = ('pk','name')

class SetVarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set_var
        fields = ('pk','name')

class CharacteristicSetVarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristic_set_var
        fields = ('pk','char_set', 'char_var')

class CharacteristicRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristic_range
        fields = ('pk','inf', 'sup')

class CharacteristicNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristic_number
        fields = ('pk','inf' ,'sup')


class CompositionCharSerializer(serializers.ModelSerializer):
    class Meta:
        model = Composition_char
        fields = ('pk','comp', 'characteristic')

class CompCharRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comp_char_range
        fields = ('pk','inf', 'sup')

class CompCharNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comp_char_number
        fields = ('pk','number')

class CompCharVarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comp_char_var
        fields = ('pk','comp_char', 'char_var')

#Характеристики реактивов
class MaterialCharSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material_char
        fields = ('pk','mat','characteristic')

class MatCharNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mat_char_number
        fields = ('pk','number')

class MatCharVarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mat_char_var
        fields = ('pk','mat_char','char_var')

# Модели для видовых характеристик

class CompPropNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comp_prop_number
        fields = ('pk','number')

class CompPropVarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comp_prop_var
        fields = ('pk', 'comp_prop','char_var')
