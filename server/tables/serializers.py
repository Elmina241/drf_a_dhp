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

class ProductFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_form
        fields = ('pk','name')


#Модели для рецептов

class CompositionGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Composition_group
        fields = ('pk','name')

class ComponentsSerializer(serializers.ModelSerializer):
    #comp_id = serializers.IntegerField(write_only=True)
    mat = MaterialSerializer(read_only=True)
    mat_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Components
        fields = ('pk', 'mat', 'mat_id', 'min', 'max')

class CompositionSerializer(serializers.ModelSerializer):
    group = CompositionGroupSerializer(read_only=True)
    group_id = serializers.IntegerField(write_only=True)
    form = ProductFormSerializer(read_only=True)
    form_id = serializers.IntegerField(write_only=True)
    components_set = ComponentsSerializer(many=True)
    class Meta:
        model = Composition
        fields = ('pk','name', 'code', 'sgr', 'sh_life',
                  'date', 'comp_package', 'standard', 'certificate',
                  'declaration', 'cur_batch', 'components_set', 'group', 'group_id', 'form', 'form_id', 'isFinal')

    def create(self, validated_data):
        components_data = validated_data.pop('components_set')
        composition = Composition.objects.create(**validated_data)
        for component_data in components_data:
            Components.objects.create(comp=composition, **component_data)
        return composition
    def update(self, instance, validated_data):
        components_data = validated_data.pop('components_set')
        instance.name = validated_data.pop('name')
        instance.code = validated_data.pop('code')
        instance.sgr = validated_data.pop('sgr')
        instance.sh_life = validated_data.pop('sh_life')
        instance.comp_package = validated_data.pop('comp_package')
        instance.standard = validated_data.pop('standard')
        instance.certificate = validated_data.pop('certificate')
        instance.declaration = validated_data.pop('declaration')
        instance.group = Composition_group.objects.get(pk=validated_data.pop('group_id'))
        instance.form = Product_form.objects.get(pk=validated_data.pop('form_id'))
        instance.isFinal = validated_data.pop('isFinal')
        instance.save()
        #instance.update(**validated_data)
        Components.objects.filter(comp=instance).delete()
        for component_data in components_data:
            Components.objects.create(comp=instance, **component_data)
        return instance

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
    group = CapGroupSerializer(read_only=True)
    colour = ColorSerializer(read_only=True)
    mat = ContainerMatSerializer(read_only=True)
    group_id = serializers.IntegerField(write_only=True)
    colour_id = serializers.IntegerField(write_only=True)
    mat_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Cap
        fields = ('pk','code', 'group', 'form', 'colour', 'mat', 'colour_id', 'mat_id', 'group_id')

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
    group = BoxGroupSerializer(read_only=True)
    colour = ColorSerializer(read_only=True)
    mat = BoxingMatSerializer(read_only=True)
    group_id = serializers.IntegerField(write_only=True)
    colour_id = serializers.IntegerField(write_only=True)
    mat_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Boxing
        fields = ('pk','code', 'group', 'form', 'colour', 'mat', 'colour_id', 'mat_id', 'group_id')



# Модели для продукции
class ProductGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_group
        fields = ('pk','name')

class ProductUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_use
        fields = ('pk','name')



class ProductMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_mark
        fields = ('pk','name')

class StickerPartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sticker_part
        fields = ('pk','name')


class ProductionMinSerializer(serializers.ModelSerializer):
    composition = CompositionSerializer(read_only=True)
    container = ContainerSerializer(read_only=True)
    cap = CapSerializer(read_only=True)
    boxing = BoxingSerializer(read_only=True)
    composition_id = serializers.IntegerField(write_only=True)
    container_id = serializers.IntegerField(write_only=True)
    cap_id = serializers.IntegerField(write_only=True)
    boxing_id = serializers.IntegerField(write_only=True)
    compUnit = UnitSerializer(read_only=True)
    contUnit = UnitSerializer(read_only=True)
    capUnit = UnitSerializer(read_only=True)
    stickerUnit = UnitSerializer(read_only=True)
    boxingUnit = UnitSerializer(read_only=True)
    compUnit_id = serializers.IntegerField(write_only=True)
    contUnit_id = serializers.IntegerField(write_only=True)
    capUnit_id = serializers.IntegerField(write_only=True)
    stickerUnit_id = serializers.IntegerField(write_only=True)
    boxingUnit_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Production
        fields = ('pk', 'composition', 'container', 'cap', 'boxing',
                  'compAmount', 'compUnit', 'contAmount', 'contUnit', 'capAmount', 'capUnit', 'stickerAmount',
                  'stickerUnit', 'boxingAmount', 'boxingUnit', 'composition_id', 'container_id', 'cap_id', 'boxing_id', 'compUnit_id', 'contUnit_id', 'capUnit_id', 'stickerUnit_id', 'boxingUnit_id')

class ProductMinSerializer(serializers.ModelSerializer):
    group = ProductGroupSerializer(read_only=True)
    use = ProductUseSerializer(read_only=True)
    mark = ProductMarkSerializer(read_only=True)
    group_id = serializers.IntegerField(write_only=True)
    use_id = serializers.IntegerField(write_only=True)
    mark_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Product
        fields = ('pk','name', 'code', 'group', 'use', 'option', 'detail', 'mark', 'group_id', 'use_id', 'mark_id')

class StickerSerializer(serializers.ModelSerializer):
    product = ProductMinSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    part = StickerPartSerializer(read_only=True)
    part_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Sticker
        fields = ('product', 'product_id', 'pk','code', 'product', 'part', 'product_id', 'part_id')

class ProductionSerializer(serializers.ModelSerializer):
    composition = CompositionSerializer(read_only=True)
    container = ContainerSerializer(read_only=True)
    cap = CapSerializer(read_only=True)
    boxing = BoxingSerializer(read_only=True)
    composition_id = serializers.IntegerField(write_only=True)
    container_id = serializers.IntegerField(write_only=True)
    cap_id = serializers.IntegerField(write_only=True)
    boxing_id = serializers.IntegerField(write_only=True)
    sticker = StickerSerializer(read_only=True)
    sticker_id = serializers.IntegerField(write_only=True)
    compUnit = UnitSerializer(read_only=True)
    contUnit = UnitSerializer(read_only=True)
    capUnit = UnitSerializer(read_only=True)
    stickerUnit = UnitSerializer(read_only=True)
    compUnit_id = serializers.IntegerField(write_only=True)
    contUnit_id = serializers.IntegerField(write_only=True)
    capUnit_id = serializers.IntegerField(write_only=True)
    stickerUnit_id = serializers.IntegerField(write_only=True)
    boxingUnit_id = serializers.IntegerField(write_only=True)
    boxingUnit = UnitSerializer(read_only=True)
    class Meta(ProductionMinSerializer.Meta):
        fields = (*ProductionMinSerializer.Meta.fields, 'sticker', 'sticker_id')

class ProductSerializer(serializers.ModelSerializer):
    group = ProductGroupSerializer(read_only=True)
    use = ProductUseSerializer(read_only=True)
    mark = ProductMarkSerializer(read_only=True)
    group_id = serializers.IntegerField(write_only=True)
    use_id = serializers.IntegerField(write_only=True)
    mark_id = serializers.IntegerField(write_only=True)
    production = ProductionMinSerializer(read_only=True)
    production_id = serializers.IntegerField(write_only=True)
    class Meta(ProductMinSerializer.Meta):
        fields = (*ProductMinSerializer.Meta.fields, 'production', 'production_id')

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
